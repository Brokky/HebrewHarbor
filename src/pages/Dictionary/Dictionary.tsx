import { useState } from "react";
import Header from "../../components/Header/Header";
import AddForm from "./parts/AddForm";
import WordList from "./parts/WordList/WordList";
import { SERVER } from "../../constants";
import "./Dictionary.scss";

const Dictionary = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="dictionary">
      <Header title={"Dictionary"} />
      <main className="dictionary-main">
        {error && <div className="error-message">{error}</div>}
        <AddForm server={SERVER} setError={setError} />
        <WordList
          server={SERVER}
          setError={setError}
        />
      </main>
    </div>
  );
};

export default Dictionary;
