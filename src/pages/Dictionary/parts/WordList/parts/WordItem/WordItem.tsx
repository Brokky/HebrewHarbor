import { useState } from "react";
import { StoredWord } from "../../../../../../types";
import UpdateWordModal from "./parts/UpdateWordModal";

interface WordItemProps {
  words: StoredWord[];
  handleSelect: (selectedWord: StoredWord) => void;
  handleUpdate: (wordId: string, updatedWord: StoredWord) => void;
  handleDelete: (wordId: string) => Promise<void>;
}

const WordItem = ({
  words,
  handleSelect,
  handleUpdate,
  handleDelete,
}: WordItemProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState<StoredWord | null>(null);

  const openModal = (word: StoredWord) => {
    setCurrentWord(word);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {isModalOpen && currentWord && (
        <UpdateWordModal
          word={currentWord}
          onClose={closeModal}
          onUpdate={handleUpdate}
        />
      )}
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
            <div className="dictionary-list-buttons-server">
              <button onClick={() => openModal(word)}>Edit word</button>
              <button onClick={() => handleDelete(word._id)}>
                Delete word
              </button>
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default WordItem;
