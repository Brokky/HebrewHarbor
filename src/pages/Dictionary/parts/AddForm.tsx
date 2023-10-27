import { useState, useEffect } from "react";
import axios from "axios";
import { NewWord } from "../../../types";
import "./AddForm.scss";
import { useAppDispatch } from "../../../hooks";
import { addWord } from "../../../store/slices/allWordsSlice";
import { selectProperties } from "../../../data";

interface AddFormProps {
  server: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const inputFields = [
  { name: "hebrew" as const, type: "text", placeholder: "Hebrew*" },
  { name: "translation" as const, type: "text", placeholder: "Translation*" },
  {
    name: "transcription" as const,
    type: "text",
    placeholder: "Transcription",
  },
];

const AddForm = ({ server, setError }: AddFormProps) => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [newWord, setNewWord] = useState<NewWord>({
    hebrew: "",
    translation: "",
    transcription: "",
    partOfSpeech: "",
    gender: "",
    number: "",
    selected: false,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsSubmitEnabled(!!newWord.hebrew && !!newWord.translation);
  }, [newWord]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(server, newWord);
      const addedWord = response.data;
      dispatch(addWord(addedWord));
      setNewWord({
        hebrew: "",
        translation: "",
        transcription: "",
        partOfSpeech: "",
        gender: "",
        number: "",
        selected: false,
      });
    } catch (error) {
      console.error("Error adding new word", error);
      setError(`Error adding words: ${(error as Error).message}`);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewWord({ ...newWord, [name]: value });
  };

  return (
    <form className="dictionary-form" onSubmit={handleSubmit}>
      <fieldset className="dictionary-form-fieldset">
        <legend>Brave new word</legend>
        <div className="dictionary-form-fieldset-inputs">
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
        </div>
        <div className="dictionary-form-fieldset-selects">
          {selectProperties.map((field) => (
            <select
              key={field.id}
              name={field.id}
              onChange={handleSelect}
              value={(newWord as any)[field.id]} // use it for reset to defaults when form is submitted
            >
              {field.options.map((option, index) => (
                <option
                  key={option.toLowerCase()}
                  value={index === 0 ? "" : option.toLowerCase()}
                  disabled={index === 0}
                >
                  {option}
                </option>
              ))}
            </select>
          ))}
        </div>
      </fieldset>

      <button
        className="dictionary-form-button"
        type="submit"
        disabled={!isSubmitEnabled}
      >
        Add to Dictionary
      </button>
    </form>
  );
};

export default AddForm;
