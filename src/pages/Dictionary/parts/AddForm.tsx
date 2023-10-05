import { useState, useEffect } from "react";
import axios from "axios";
import { NewWord, StoredWord } from "../../../types";
import "./AddForm.scss";

interface AddFormProps {
  server: string;
  setWords: React.Dispatch<React.SetStateAction<StoredWord[]>>;
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

const selectFields = [
  {
    name: "partOfSpeech",
    options: ["Part of speech", "Noun", "Verb", "Adjective"],
  },
  {
    name: "gender",
    options: ["Gender", "Masculine", "Feminine", "Neuter"],
  },
  {
    name: "number",
    options: ["Number", "Singular", "Plural"],
  },
];

const AddForm = ({ server, setWords, setError }: AddFormProps) => {
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

  useEffect(() => {
    setIsSubmitEnabled(!!newWord.hebrew && !!newWord.translation);
  }, [newWord]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(server, newWord);
      const addedWord = response.data;
      setWords((prevWords) => [...prevWords, addedWord]);
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
          {selectFields.map((field) => (
            <select
              key={field.name}
              name={field.name}
              onChange={handleSelect}
              value={(newWord as any)[field.name]} // use it for reset to defaults when form is submitted
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
