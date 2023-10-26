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
import { useEffect, useState } from "react";

interface WordListProps {
  server: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const WordList = ({ server, setError }: WordListProps) => {
  const dispatch = useAppDispatch();
  const allWords = useAppSelector((state) => state.allWords.allWords);

  const [selectsState, setSelectsState] = useState({
    partOfSpeech: "",
    gender: "",
    number: "",
    text: "",
  });

  const [filteredWords, setFilteredWords] = useState(allWords);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectsState((prevState) => ({
      ...prevState,
      text: value,
    }));
  };

  useEffect(() => {
    const filtered = allWords.filter((word) => {
      return (
        (word.hebrew.includes(selectsState.text) ||
          word.transcription.includes(selectsState.text) ||
          word.translation.includes(selectsState.text)) &&
        (word.partOfSpeech === selectsState.partOfSpeech ||
          selectsState.partOfSpeech === "") &&
        (word.gender === selectsState.gender || selectsState.gender === "") &&
        (word.number === selectsState.number || selectsState.number === "")
      );
    });
    setFilteredWords(filtered);
  }, [selectsState, allWords]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelectsState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
      <div className="dictionary-sorting">
        <label>Find the word</label>
        <input
          type="text"
          name="word-search"
          placeholder="Search..."
          onChange={handleInputChange}
        />
        <div className="dictionary-sorting-selects">
          <select name="partOfSpeech" onChange={handleSelectChange}>
            <option value="">Any part of speech</option>
            <option value="noun">Noun</option>
            <option value="verb">Verb</option>
            <option value="adjective">Adjective</option>
          </select>
          <select name="gender" onChange={handleSelectChange}>
            <option value="">Any gender</option>
            <option value="masculine">Masculine</option>
            <option value="feminine">Feminine</option>
            <option value="neuter">Neuter</option>
          </select>
          <select name="number" onChange={handleSelectChange}>
            <option value="">Any number</option>
            <option value="singular">Singular</option>
            <option value="plural">Plural</option>
          </select>
        </div>
      </div>
      <button
        onClick={() => {
          filteredWords.forEach((word) => handleSelect(word._id));
        }}
      >
        Select all
      </button>
      <ul className="dictionary-list">
        <WordItem
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          filteredWords={filteredWords}
        />
      </ul>
    </>
  );
};

export default WordList;
