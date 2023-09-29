import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { NewWord, StoredWord } from "../../types";
import { addWord, removeWord } from "../../selectedWordsSlice";
import { RootState } from "../../store";
import "./Dictionary.scss";

const inputFields = [
  { name: "hebrew" as const, placeholder: "Hebrew" },
  { name: "translation" as const, placeholder: "Translation" },
  { name: "transcription" as const, placeholder: "Transcription" },
];

const server = "http://13.53.38.63:3000/words";

const Dictionary = () => {
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

  const [newWord, setNewWord] = useState<NewWord>({
    hebrew: "",
    translation: "",
    transcription: "",
    selected: false,
  });

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [words, setWords] = useState<StoredWord[]>([]);

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
      }
    };

    loadWords();
  }, [selectedWords]);

  useEffect(() => {
    setIsSubmitEnabled(
      !!newWord.hebrew && !!newWord.translation && !!newWord.transcription
    );
  }, [newWord]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(server, newWord);
      setNewWord({
        hebrew: "",
        translation: "",
        transcription: "",
        selected: false,
      });
      const response = await axios.get(server);
      setWords(response.data);
    } catch (error) {
      console.error("Error adding new word", error);
    }
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
    }
  };

  return (
    <div className="dictionary">
      <Header title={"Dictionary"} />
      <main className="dictionary-main">
        <form className="dictionary-form" onSubmit={handleSubmit}>
          <fieldset className="dictionary-form-fieldset">
            <legend>Brave new word</legend>
            {inputFields.map((field) => (
              <input
                key={field.name}
                type="text"
                placeholder={field.placeholder}
                value={newWord[field.name]}
                onChange={(e) =>
                  setNewWord({ ...newWord, [field.name]: e.target.value })
                }
              />
            ))}
          </fieldset>

          <button type="submit" disabled={!isSubmitEnabled}>
            Add to Dictionary
          </button>
        </form>

        <button onClick={() => {
          words.forEach(word => handleSelect(word));
        }}>Select all</button>
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
      </main>
    </div>
  );
};

export default Dictionary;
