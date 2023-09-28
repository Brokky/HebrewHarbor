import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Header from "../../components/Header/Header";
import "./Lesson.scss";
import { StoredWord } from "../../types";

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
  console.log(correctWord);

  while (options.length < 4) {
    let randomWord = allWords[getRandom(0, allWords.length - 1)];

    if (!options.includes(randomWord)) {
      options.push(randomWord);
    }
  }

  return shuffleArray(options);
}

const Lesson = () => {
  const selectedWords = useSelector(
    (state: RootState) => state.selectedWords.selectedWords
  );

  const [isStarted, setIsStarted] = useState(false);
  const [remainingWords, setRemainingWords] = useState<StoredWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [options, setOptions] = useState<StoredWord[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleStart = () => {
    if (selectedWords.length < 4) {
      setErrorMessage(
        "It is necessary to select a minimum of 4 words at Dictionary page to start the lesson."
      );
    } else {
      setIsStarted(true);
      setRemainingWords(shuffleArray([...selectedWords]));
      setErrorMessage(null);
    }
  };

  useEffect(() => {
    if (selectedWords.length >= 4 && remainingWords.length > 0) {
      setOptions(getOptions(remainingWords[currentWordIndex], selectedWords));
      console.log(remainingWords.length, currentWordIndex);
    }
  }, [remainingWords, currentWordIndex]);

  const handleAnswer = (answer: StoredWord) => {
    if (answer === remainingWords[currentWordIndex]) {
      setRemainingWords((prev) => prev.filter((el) => el !== answer));
      setCurrentWordIndex(0);
      console.log("right", remainingWords.length);
    } else {
      setCurrentWordIndex((prev) => (prev + 1) % remainingWords.length);
      console.log("wrong", remainingWords.length);
    }
  };

  return (
    <div className="lesson">
      <Header title={"Lesson"} />
      <main className="lesson-main">
        {!isStarted && (
          <div className="lesson-start">
            {!isStarted && <button onClick={handleStart}>Start</button>}
            {errorMessage && <p className="lesson-error">{errorMessage}</p>}
          </div>
        )}
        {isStarted && (
          <div className="lesson-box">
            <p className="lesson-word">
              {remainingWords[currentWordIndex]?.hebrew}
            </p>
            <div className="lesson-buttons">
              {options.map((word) => {
                return (
                  <button key={word._id} onClick={() => handleAnswer(word)}>
                    {word.translation}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Lesson;
