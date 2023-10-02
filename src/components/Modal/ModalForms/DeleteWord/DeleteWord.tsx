import { StoredWord } from "../../../../types";
import "./DeleteWord.scss";

interface DeleteWordProps {
  word: StoredWord;
  onDelete: (wordId: string) => Promise<void>;
  onClose: () => void;
}

const DeleteWord = ({ word, onDelete, onClose }: DeleteWordProps) => {
  const handleDelete = () => {
    onDelete(word._id);
    onClose();
  };

  return (
    <div className="modal-delete">
      <p>
        Are you sure you want to delete this word? This action cannot be undone.
      </p>
      <div>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteWord;
