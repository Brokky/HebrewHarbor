import { StoredWord } from "../../../../types";
import axios from "axios";
import WordItem from "./parts/WordItem/WordItem";
import "./WordList.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  editWord,
  removeWord,
  toggleWordSelection,
} from "../../../../store/slices/allWordsSlice";

interface WordListProps {
  server: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const WordList = ({ server, setError }: WordListProps) => {
  const dispatch = useAppDispatch();
  const allWords = useAppSelector((state) => state.allWords.allWords);

  const handleSelect = (id: string) => {
    dispatch(toggleWordSelection(id));
  };

  const handleUpdate = async (wordId: string, updatedWord: StoredWord) => {
    try {
      await axios.put(`${server}/${wordId}`, updatedWord);
      dispatch(editWord({ updatedWord, wordId }));
    } catch (error) {
      console.error("Error updating word", error);
      setError(`Error updating word: ${(error as Error).message}`);
    }
  };

  const handleDelete = async (wordId: string) => {
    try {
      await axios.delete(`${server}/${wordId}`);
      dispatch(removeWord(wordId));
    } catch (error) {
      console.error("Error deleting word", error);
      setError(`Error deleting words: ${(error as Error).message}`);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          allWords.forEach((word) => handleSelect(word._id));
        }}
      >
        Select all
      </button>
      <ul className="dictionary-list">
        <WordItem handleUpdate={handleUpdate} handleDelete={handleDelete} />
      </ul>
    </>
  );
};

export default WordList;
