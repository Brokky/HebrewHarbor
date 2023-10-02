import { useState } from "react";
import { StoredWord } from "../../types";
import Header from "../../components/Header/Header";
import AddForm from "./parts/AddForm";
import WordList from "./parts/WordList/WordList";
import { SERVER } from "../../constants";
import "./Dictionary.scss";

const Dictionary = () => {
  const [error, setError] = useState<string | null>(null);
  const [words, setWords] = useState<StoredWord[]>([]);

  return (
    <div className="dictionary">
      <Header title={"Dictionary"} />
      <main className="dictionary-main">
        {error && <div className="error-message">{error}</div>}
        <AddForm server={SERVER} setWords={setWords} setError={setError} />
        <WordList
          server={SERVER}
          words={words}
          setWords={setWords}
          setError={setError}
        />
      </main>
    </div>
  );
};

export default Dictionary;
