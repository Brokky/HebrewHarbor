import { StoredWord } from "../../../../../types";

interface WordItemProps {
  words: StoredWord[];
  handleSelect: (selectedWord: StoredWord) => void;
  handleDelete: (wordId: string) => Promise<void>;
}

const WordItem = ({ words, handleSelect, handleDelete }: WordItemProps) => {
  return (
    <>
      {words.map((word) => (
        <li key={word._id} className={`${word.selected ? "selected" : ""}`}>
          <div className="dictionary-list-word">
            <p>{word.hebrew}</p>
            <p>{word.translation}</p>
            <p>{word.transcription}</p>
          </div>
          <div className="dictionary-list-buttons">
            <button onClick={() => handleSelect(word)}>
              {word.selected ? "Remove from Lesson" : "Add to Lesson"}
            </button>
            <button onClick={() => handleDelete(word._id)}>Delete word</button>
          </div>
        </li>
      ))}
    </>
  );
};

export default WordItem;
