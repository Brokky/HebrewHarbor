import { useState, useEffect } from "react";
import { StoredWord } from "../../../../../../types";
import Modal from "../../../../../../components/Modal/Modal";
import UpdateWord from "../../../../../../components/Modal/ModalForms/UpdateWord/UpdateWord";
import DeleteWord from "../../../../../../components/Modal/ModalForms/DeleteWord/DeleteWord";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks";
import { useGetWordsQuery } from "../../../../../../store/services/WordsService";
import {
  setWords,
  toggleWordSelection,
} from "../../../../../../store/slices/allWordsSlice";
import "./WordItem.scss";

interface WordItemProps {
  handleUpdate: (wordId: string, updatedWord: StoredWord) => void;
  handleDelete: (wordId: string) => Promise<void>;
  filteredWords: StoredWord[];
}

const WordItem = ({ handleUpdate, handleDelete, filteredWords }: WordItemProps) => {
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

  const allWords = useAppSelector((state) => state.allWords.allWords);
  const dispatch = useAppDispatch();
  const { data: words, isLoading, isError } = useGetWordsQuery();

  useEffect(() => {
    if (words && allWords.length === 0) {
      dispatch(setWords(words));
    }
  }, [words, dispatch]);

  const handleSelect = (id: string) => {
    dispatch(toggleWordSelection(id));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading words</div>;
  }

  return (
    <>
      {isModalOpen && <Modal>{renderModalContent()}</Modal>}
      {filteredWords.map((word) => (
        <li
          key={word._id}
          className={`dictionary-list-card ${word.selected ? "selected" : ""}`}
        >
          <div className="dictionary-list-card-front">
            <div className="dictionary-list-card-word">
              <div className="dictionary-list-card-word-main"></div>
              <p className="dictionary-list-card-word-hebrew">{word.hebrew}</p>
              <p className="dictionary-list-card-word-transcription">
                {word.transcription}
              </p>
              <p className="dictionary-list-card-word-translation">
                {word.translation}
              </p>
            </div>
          </div>
          <div className="dictionary-list-card-back">
            <div className="dictionary-list-card-word">
              <p className="dictionary-list-card-word-translation">
                {word.partOfSpeech || "Part of speech"}
              </p>
              <p className="dictionary-list-card-word-translation">
                {word.gender || "Gender"}
              </p>
              <p className="dictionary-list-card-word-translation">
                {word.number || "Number"}
              </p>
            </div>
            <div className="dictionary-list-card-buttons">
              <button onClick={() => handleSelect(word._id)}>
                {word.selected ? "Remove from Lesson" : "Add to Lesson"}
              </button>
              <div className="dictionary-list-card-buttons-server">
                <button onClick={() => openModal(word, "EDIT")}>Edit</button>
                <button onClick={() => openModal(word, "DELETE")}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default WordItem;
