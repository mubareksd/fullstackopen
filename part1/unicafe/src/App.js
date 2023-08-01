import { useState } from 'react';

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, sum }) =>
  sum === 0 ? (
    <p>No feedback given</p>
  ) : (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={sum} />
        <StatisticLine text="average" value={(good * 1 + bad * -1) / sum} />
        <StatisticLine text="positive" value={`${((good * 1) / sum) * 100}%`} />
      </tbody>
    </table>
  );

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>;

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [sum, setSum] = useState(0);

  const handleGoodBtn = () => {
    setGood(good + 1);
    setSum(sum + 1);
  };

  const handleNeutralBtn = () => {
    setNeutral(neutral + 1);
    setSum(sum + 1);
  };

  const handleBadBtn = () => {
    setBad(bad + 1);
    setSum(sum + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handler={handleGoodBtn} />
      <Button text="neutral" handler={handleNeutralBtn} />
      <Button text="bad" handler={handleBadBtn} />
      <Statistics good={good} neutral={neutral} bad={bad} sum={sum} />
    </div>
  );
};

export default App;
