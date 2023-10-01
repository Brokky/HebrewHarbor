import { useState, useEffect } from "react";
import axios from "axios";
import { NewWord, StoredWord } from "../../../types";

interface AddFormProps {
  server: string;
  setWords: React.Dispatch<React.SetStateAction<StoredWord[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const inputFields = [
  { name: "hebrew" as const, placeholder: "Hebrew" },
  { name: "translation" as const, placeholder: "Translation" },
  { name: "transcription" as const, placeholder: "Transcription" },
];

const AddForm = ({ server, setWords, setError }: AddFormProps) => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [newWord, setNewWord] = useState<NewWord>({
    hebrew: "",
    translation: "",
    transcription: "",
    selected: false,
  });

  useEffect(() => {
    setIsSubmitEnabled(
      !!newWord.hebrew && !!newWord.translation && !!newWord.transcription
    );
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
        selected: false,
      });
    } catch (error) {
      console.error("Error adding new word", error);
      setError(`Error adding words: ${(error as Error).message}`);
    }
  };

  return (
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
  );
};

export default AddForm;
