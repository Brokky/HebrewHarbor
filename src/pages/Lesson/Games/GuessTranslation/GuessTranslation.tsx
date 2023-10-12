import { StoredWord } from "../../../../types";

interface GuessTranslationProps {
  time: number;
  remainingWords: StoredWord[];
  disabledWords: StoredWord[];
  options: StoredWord[];
  formatTime: (arg0: number) => string;
  handleAnswer: (arg0: StoredWord) => void;
}

const GuessTranslation = ({
  time,
  remainingWords,
  disabledWords,
  options,
  formatTime,
  handleAnswer,
}: GuessTranslationProps) => {
  return (
    <>
      <div className="lesson-timer">{formatTime(time)}</div>
      <div className="lesson-box">
        <p className="lesson-word">{remainingWords[0]?.translation}</p>
        <div className="lesson-buttons">
          {options.map((word) => {
            return (
              <button
                key={word._id}
                onClick={() => handleAnswer(word)}
                disabled={disabledWords.includes(word)}
              >
                {word.hebrew}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GuessTranslation;
