import { useState } from "react";
import { StoredWord } from "../../../../../../../types";
import "./UpdateWordModal.scss";

interface UpdateWordModalProps {
  word: StoredWord;
  onClose: () => void;
  onUpdate: (wordId: string, updatedWord: StoredWord) => void;
}

const UpdateWordModal = ({ word, onClose, onUpdate }: UpdateWordModalProps) => {
  const [updatedWord, setUpdatedWord] = useState(word);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(word._id, updatedWord);
    onClose();
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <label htmlFor="hebrew">Hebrew</label>
          <input
            id="hebrew"
            type="text"
            value={updatedWord.hebrew}
            onChange={(e) =>
              setUpdatedWord({ ...updatedWord, hebrew: e.target.value })
            }
          />
          <label htmlFor="translation">Translation</label>
          <input
            id="translation"
            type="text"
            value={updatedWord.translation}
            onChange={(e) =>
              setUpdatedWord({ ...updatedWord, translation: e.target.value })
            }
          />
          <label htmlFor="transcription">Transcription</label>
          <input
            id="transcription"
            type="text"
            value={updatedWord.transcription}
            onChange={(e) =>
              setUpdatedWord({ ...updatedWord, transcription: e.target.value })
            }
          />
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateWordModal;
