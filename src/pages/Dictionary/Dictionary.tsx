import { useState } from "react";
import { StoredWord } from "../../types";
import Header from "../../components/Header/Header";
import AddForm from "./parts/AddForm";
import WordList from "./parts/WordList/WordList";
import "./Dictionary.scss";

const server = "https://hebrew-harbor.duckdns.org/words";

const Dictionary = () => {
  const [error, setError] = useState<string | null>(null);
  const [words, setWords] = useState<StoredWord[]>([]);

  return (
    <div className="dictionary">
      <Header title={"Dictionary"} />
      <main className="dictionary-main">
        {error && <div className="error-message">{error}</div>}
        <AddForm server={server} setWords={setWords} setError={setError} />
        <WordList
          server={server}
          words={words}
          setWords={setWords}
          setError={setError}
        />
      </main>
    </div>
  );
};

export default Dictionary;
