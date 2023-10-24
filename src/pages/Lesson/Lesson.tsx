import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import "./Lesson.scss";
import { StoredWord } from "../../types";
import GuessWord from "./Games/GuessWord/GuessWord";
import GuessTranslation from "./Games/GuessTranslation/GuessTranslation";
import { useAppSelector } from "../../hooks";
import { getSelectedWords } from "../../store/selectors";
import Stats from "./Stats/Stats";

interface GameStatus {
  isStarted: boolean;
  isFinished: boolean;
  typeOfGame: string | null;
}

function getRandom(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array: StoredWord[]): StoredWord[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getOptions(
  correctWord: StoredWord,
  allWords: StoredWord[]
): StoredWord[] {
  let options = [correctWord];

  while (options.length < 4) {
    let randomWord = allWords[getRandom(0, allWords.length - 1)];

    if (!options.includes(randomWord)) {
      options.push(randomWord);
    }
  }

  return shuffleArray(options);
}

const Lesson = () => {
  const allWords = useAppSelector((state) => state.allWords.allWords);
  const selectedWords = useAppSelector(getSelectedWords);

  const [gameStatus, setGameStatus] = useState<GameStatus>({
    isStarted: false,
    isFinished: false,
    typeOfGame: null,
  });
  let { isStarted, isFinished, typeOfGame } = gameStatus;

  const [remainingWords, setRemainingWords] = useState<StoredWord[]>([]);
  const [disabledWords, setDisabledWords] = useState<StoredWord[]>([]);
  const [options, setOptions] = useState<StoredWord[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<null | number>(null);
  const [stats, setStats] = useState({
    wordsCount: 0,
    wrongAnswersCount: 0,
    firstTryCount: 0,
    overallTime: 0,
  });

  let { wordsCount, wrongAnswersCount, firstTryCount, overallTime } = stats;

  const handleStart = (type: string) => {
    if (selectedWords.length < 4) {
      setErrorMessage(
        "It is necessary to select a minimum of 4 words at Dictionary page to start the lesson."
      );
    } else {
      setGameStatus((prev) => ({ ...prev, isStarted: true, typeOfGame: type }));
      setRemainingWords(shuffleArray([...selectedWords]));
      setStats((prev) => ({
        ...prev,
        wordsCount: selectedWords.length,
      }));
      setErrorMessage(null);
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  useEffect(() => {
    if (selectedWords.length >= 4 && remainingWords.length > 0) {
      setOptions(getOptions(remainingWords[0], allWords));
    }

    if (remainingWords.length === 0 && isStarted) {
      setGameStatus((prev) => ({
        ...prev,
        isFinished: true,
        isStarted: false,
        typeOfGame: null,
      }));
      setStats((prev) => ({
        ...prev,
        overallTime: time,
      }));
      clearInterval(intervalId!);
      setTime(0);
      setIntervalId(null);
    }
  }, [remainingWords]);

  const handleAnswer = (answer: StoredWord) => {
    if (answer === remainingWords[0]) {
      setDisabledWords([]);
      setRemainingWords((prev) => prev.filter((el) => el !== answer));
      setStats((prev) => ({
        ...prev,
        firstTryCount:
          disabledWords.length === 0 ? firstTryCount++ : firstTryCount,
      }));
    } else {
      setDisabledWords((prev) => [...prev, answer]);
      setStats((prev) => ({
        ...prev,
        wrongAnswersCount: wrongAnswersCount++,
      }));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="lesson">
      <Header title={"Lesson"} />
      <main className="lesson-main">
        {!isStarted && !isFinished && (
          <div className="lesson-start">
            <div>
              <div className="lesson-words">
                <h2>Your words</h2>
                <ul className="lesson-words-list">
                  {selectedWords.map((word) => (
                    <li key={word._id}>{word.hebrew}</li>
                  ))}
                </ul>
              </div>
              <div className="lesson-game-starters">
                <button onClick={() => handleStart("WORD")}>Guess Word</button>
                <button onClick={() => handleStart("TRANSLATION")}>
                  Guess Translation
                </button>
              </div>
            </div>
            {errorMessage && <p className="lesson-error">{errorMessage}</p>}
          </div>
        )}
        {isStarted && typeOfGame === "WORD" && (
          <GuessWord
            time={time}
            remainingWords={remainingWords}
            disabledWords={disabledWords}
            options={options}
            formatTime={formatTime}
            handleAnswer={handleAnswer}
          />
        )}
        {isStarted && typeOfGame === "TRANSLATION" && (
          <GuessTranslation
            time={time}
            remainingWords={remainingWords}
            disabledWords={disabledWords}
            options={options}
            formatTime={formatTime}
            handleAnswer={handleAnswer}
          />
        )}
        {isFinished && (
          <Stats
            wordsCount={wordsCount}
            wrongAnswersCount={wrongAnswersCount}
            firstTryCount={firstTryCount}
            overallTime={overallTime}
          />
        )}
      </main>
    </div>
  );
};

export default Lesson;
