import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1> ;

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({text, value}) => <><td>{text}</td> <td>{value}</td></>; 

const Statistics = ({text, good, neutral, bad, total}) => {
  const valueProps = [good, neutral, bad];
  const categoriesText = text.map((category, index) => <tr><StatisticLine text={category} value={valueProps[index]} /></tr>);

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
    <table>
      <tbody>
        {categoriesText}
        <tr>
          <StatisticLine text={"all"} value={total}/>
        </tr>
        <tr>
          <StatisticLine text={"average"} value={(good - bad) / total}/>
        </tr>
        <tr>
          <StatisticLine text={"positive"} value={(good / total) * 100 + "%"}/>
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGoodClick = () => {
    const incrementGood  = good + 1;
    setGood(incrementGood);
    setTotal(incrementGood + neutral + bad);
  };

  const handleNeutralClick = () => {
    const incrementNeutral  = neutral + 1;
    setNeutral(incrementNeutral);
    setTotal(good + incrementNeutral + bad);
  };

  const handleBadClick = () => {
    const incrementBad  = bad + 1;
    setBad(incrementBad);
    setTotal(good + neutral + incrementBad);
  };

  const categoriesText =  ["good", "neutral", "bad"];

  return (
    <div>
      <Header text={"give feedback"} />
      <Button onClick={handleGoodClick} text={categoriesText[0]} />
      <Button onClick={handleNeutralClick} text={categoriesText[1]} />
      <Button onClick={handleBadClick} text={categoriesText[2]} />
      <Header text={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} text={categoriesText} />  
    </div>
  );
};

export default App;