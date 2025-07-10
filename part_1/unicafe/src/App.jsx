import { use } from 'react'
import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ label, value }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    const average = total === 0 ? 0 : (good - bad) / total;
    const positive = total === 0 ? 0 : (good / total) * 100;

    if (total === 0) {
      return <div>No feedback given</div>;
    }

    return  (
      <table>
        <tbody>
          <StatisticLine label='good' value={good}/>
          <StatisticLine label='neutral' value={neutral}/>
          <StatisticLine label='bad' value={bad}/>
          <StatisticLine label='all' value={total}/>
          <StatisticLine label='average' value={average}/>
          <StatisticLine label='positive' value={`${positive} %`}/>
        </tbody>
      </table>
    )
  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleIncrement = (setter) => {
    setter(value => value + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => handleIncrement(setGood)} text='good'/>
      <Button onClick={() => handleIncrement(setNeutral)} text='neutral'/>
      <Button onClick={() => handleIncrement(setBad)} text='bad'/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App