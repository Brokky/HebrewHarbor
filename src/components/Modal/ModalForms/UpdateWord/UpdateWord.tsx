import { useState } from "react";
import { StoredWord } from "../../../../types";
import "./UpdateWord.scss";
import { selectProperties } from "../../../../data";

interface UpdateWordProps {
  word: StoredWord;
  onUpdate: (wordId: string, updatedWord: StoredWord) => void;
  onClose: () => void;
}

function getValue(word: StoredWord, key: string): any {
  if (key in word) {
    return word[key as keyof StoredWord];
  }
  throw new Error(`Key ${key} does not exist on StoredWord object`);
}

// to make labels look good
const camelCaseToNormalText = (text: string) => {
  return text
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .replace(/^./, (str) => str.toUpperCase());
};

const UpdateWord = ({ word, onClose, onUpdate }: UpdateWordProps) => {
  const [updatedWord, setUpdatedWord] = useState(word);

  const inputFields = [
    { id: "hebrew", type: "text", value: updatedWord.hebrew },
    { id: "translation", type: "text", value: updatedWord.translation },
    { id: "transcription", type: "text", value: updatedWord.transcription },
  ];

  const selectFields = selectProperties.map((field) => {
    return {
      ...field,
      value: getValue(updatedWord, field.id),
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(word._id, updatedWord);
    onClose();
  };

  return (
    <>
      <div className="modal">
        <form onSubmit={handleSubmit}>
          {inputFields.map((field) => (
            <>
              <label htmlFor={field.id}>
                {camelCaseToNormalText(field.id)}
              </label>
              <input
                id={field.id}
                type={field.type}
                value={field.value}
                onChange={(e) =>
                  setUpdatedWord({ ...updatedWord, [field.id]: e.target.value })
                }
              />
            </>
          ))}

          {selectFields.map((field) => (
            <>
              <label htmlFor={field.id}>
                {camelCaseToNormalText(field.id)}
              </label>
              <select
                id={field.id}
                value={field.value}
                onChange={(e) =>
                  setUpdatedWord({ ...updatedWord, [field.id]: e.target.value })
                }
              >
                {field.options.map((option, index) => {
                  if (index === 0) {
                    return <option key={option} value="" disabled></option>;
                  }

                  return (
                    <option key={option} value={option.toLowerCase()}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </>
          ))}

          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateWord;
