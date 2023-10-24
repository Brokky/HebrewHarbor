import "./Stats.scss";

interface StatsProps {
  wordsCount: number;
  wrongAnswersCount: number;
  firstTryCount: number;
  overallTime: number;
}

const Stats = ({
  wordsCount,
  wrongAnswersCount,
  firstTryCount,
  overallTime,
}: StatsProps) => {
  const formattedTime = `${Math.floor(overallTime / 60)}m ${overallTime % 60}s`;

  return (
    <div className="stats">
      <h2>Stats</h2>
      <div>
        <p>Words: {wordsCount}</p>
        <p>Wrong answers: {wrongAnswersCount}</p>
        <p>Right on first try: {firstTryCount}</p>
        <p>Overall time: {formattedTime}</p>
      </div>
    </div>
  );
};

export default Stats;
