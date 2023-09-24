import { useState, useEffect } from "react";
import "./Dictionary.scss";
import Header from "../../components/Header/Header";

interface Word {
  hebrew: string;
  translation: string;
  transcription: string;
}

const inputFields = [
  { name: "hebrew" as const, placeholder: "Hebrew" },
  { name: "translation" as const, placeholder: "Translation" },
  { name: "transcription" as const, placeholder: "Transcription" },
];

const Dictionary = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [newWord, setNewWord] = useState<Word>({
    hebrew: "",
    translation: "",
    transcription: "",
  });

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWords((prevWords) => [...prevWords, newWord]);
  };

  useEffect(() => {
    setIsSubmitEnabled(
      !!newWord.hebrew && !!newWord.translation && !!newWord.transcription
    );
  }, [newWord]);

  return (
    <div className="dictionary">
      <Header title={"Dictionary"} />
      <main className="dictionary-main">
        <form className="dictionary-form" onSubmit={handleSubmit}>
          <fieldset className="dictionary-form-fieldset">
            <legend>New word</legend>
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
            Add
          </button>
        </form>

        <ul className="dictionary-list">
          {words.map((word, index) => (
            <li key={index}>
              {word.hebrew} - {word.translation} - {word.transcription}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Dictionary;
