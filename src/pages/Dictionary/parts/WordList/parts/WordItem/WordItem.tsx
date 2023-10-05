import { useState } from "react";
import { StoredWord } from "../../../../../../types";
import Modal from "../../../../../../components/Modal/Modal";
import UpdateWord from "../../../../../../components/Modal/ModalForms/UpdateWord/UpdateWord";
import DeleteWord from "../../../../../../components/Modal/ModalForms/DeleteWord/DeleteWord";
import "./WordItem.scss";

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
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [currentWord, setCurrentWord] = useState<StoredWord | null>(null);

  const openModal = (word: StoredWord, modalForm: string) => {
    setCurrentWord(word);
    setModalOpen(true);
    setCurrentModal(modalForm);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const renderModalContent = (): JSX.Element => {
    if (!currentWord) return <div>Error</div>;

    switch (currentModal) {
      case "EDIT":
        return (
          <UpdateWord
            word={currentWord}
            onUpdate={handleUpdate}
            onClose={closeModal}
          />
        );
      case "DELETE":
        return (
          <DeleteWord
            word={currentWord}
            onDelete={handleDelete}
            onClose={closeModal}
          />
        );
      default:
        return <div>Error</div>;
    }
  };

  return (
    <>
      {isModalOpen && <Modal>{renderModalContent()}</Modal>}
      {words.map((word) => (
        <li
          key={word._id}
          className={`dictionary-list-card ${word.selected ? "selected" : ""}`}
        >
          <div className="dictionary-list-card-word">
            <p className="dictionary-list-card-word-hebrew">{word.hebrew}</p>
            <p className="dictionary-list-card-word-translation">
              {word.translation}
            </p>
          </div>
          <div className="dictionary-list-card-buttons">
            <button onClick={() => handleSelect(word)}>
              {word.selected ? "Remove from Lesson" : "Add to Lesson"}
            </button>
            <div className="dictionary-list-card-buttons-server">
              <button onClick={() => openModal(word, "EDIT")}>Edit</button>
              <button onClick={() => openModal(word, "DELETE")}>Delete</button>
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default WordItem;
