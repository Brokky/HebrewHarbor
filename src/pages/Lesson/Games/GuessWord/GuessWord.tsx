import { StoredWord } from "../../../../types";

interface GuessWordProps {
    time: number;
    remainingWords: StoredWord[];
    disabledWords: StoredWord[];
    options: StoredWord[];
    formatTime: (arg0: number) => string;
    handleAnswer: (arg0: StoredWord) => void;
}

const GuessWord = ({time, remainingWords, disabledWords, options, formatTime, handleAnswer}: GuessWordProps) => {
  return (
    <>
      <div className="lesson-timer">{formatTime(time)}</div>
      <div className="lesson-box">
        <p className="lesson-word">{remainingWords[0]?.hebrew}</p>
        <div className="lesson-buttons">
          {options.map((word) => {
            return (
              <button
                key={word._id}
                onClick={() => handleAnswer(word)}
                disabled={disabledWords.includes(word)}
              >
                {word.translation}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GuessWord;
