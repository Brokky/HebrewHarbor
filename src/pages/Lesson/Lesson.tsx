import Header from "../../components/Header/Header";
import "./Lesson.scss";

const Lesson = () => {

  const handleStart = () => {
    
  }

  return (
    <div className="lesson">
      <Header title={"Lesson"} />
      <main className="lesson-main">
        <button onClick={handleStart}>Start</button>
      </main>
    </div>
  );
};

export default Lesson;
