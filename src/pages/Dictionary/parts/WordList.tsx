import { StoredWord } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { addWord, removeWord } from "../../../selectedWordsSlice";
import axios from "axios";
import { useEffect } from "react";

type WordListProps = {
  server: string;
  words: StoredWord[];
  setWords: React.Dispatch<React.SetStateAction<StoredWord[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const WordList = ({ server, words, setWords, setError }: WordListProps) => {
  const dispatch = useDispatch();
  const selectedWords = useSelector(
    (state: RootState) => state.selectedWords.selectedWords
  );

  const handleSelect = (selectedWord: StoredWord) => {
    if (selectedWord.selected) {
      dispatch(removeWord(selectedWord._id));
    } else {
      dispatch(addWord(selectedWord));
    }

    setWords((prevWords) =>
      prevWords.map((word) =>
        word._id === selectedWord._id
          ? { ...word, selected: !word.selected }
          : word
      )
    );
  };

  const handleDelete = async (wordId: string) => {
    try {
      await axios.delete(`${server}/${wordId}`);
      setWords((prevWords) => prevWords.filter((word) => word._id !== wordId));
      if (selectedWords.some((word) => word._id === wordId)) {
        dispatch(removeWord(wordId));
      }
    } catch (error) {
      console.error("Error deleting word", error);
      setError(`Error deleting words: ${(error as Error).message}`);
    }
  };

  useEffect(() => {
    const loadWords = async () => {
      try {
        const response = await axios.get(server);
        const loadedWords = response.data;
        setWords(
          loadedWords.map((word: StoredWord) => ({
            ...word,
            selected: selectedWords.some(
              (selectedWord) => selectedWord._id === word._id
            ),
          }))
        );
      } catch (error) {
        console.error("Error loading words", error);
        setError(`Error loading words: ${(error as Error).message}`);
      }
    };

    loadWords();
  }, [selectedWords]);

  return (
    <>
      <button
        onClick={() => {
          words.forEach((word) => handleSelect(word));
        }}
      >
        Select all
      </button>
      <ul className="dictionary-list">
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
              <button onClick={() => handleDelete(word._id)}>
                Delete word
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default WordList;
