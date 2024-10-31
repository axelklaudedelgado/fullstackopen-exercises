import { useState } from 'react'

const generateRandomNumber = () => Math.floor((Math.random() * 8));

const someIsNotZero = (array) => array.some(item => item !== 0);

const getHighestVotes = (array) => array.indexOf(Math.max(...array));

const Header = ({text}) => <h1>{text}</h1> ;

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>;

const AnecdoteText = ({anecdotes, votes, index}) => {
  return(
    <>
      <p>{anecdotes[index]}</p>
      <p>has {votes[index]} votes</p>
    </>
  );
};

const Popular = ({anecdotes, votes, highestIndex}) => {
  if(!someIsNotZero(votes)) {
    return(
      <p>No votes have been given</p>
    );
  }

  return (
    <AnecdoteText anecdotes={anecdotes} votes={votes} index={highestIndex} />
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  const [selected, setSelected] = useState(generateRandomNumber());
  const [clicks, setClicks] = useState(new Uint8Array(8));

  const handleClickNext = (currentNumber) => {
    let nextNumber = generateRandomNumber();

    do {
      nextNumber = generateRandomNumber();
    } while (nextNumber === currentNumber); 

    setSelected(nextNumber);
  };

  const handleClickVote = (index) => {
    const voteCopy = [...clicks];
    voteCopy[index] += 1;

    setClicks(voteCopy);
  };

  return (
    <div>
      <Header text={"Anecdote of the day"} />
      <AnecdoteText anecdotes={anecdotes} votes={clicks} index={selected} />
      <Button text={"vote"} onClick={() => handleClickVote(selected)} />
      <Button text={"next anecdote"} onClick={() => handleClickNext(selected)} />
      <Header text={"Anecdote with most votes"} />
      <Popular anecdotes={anecdotes} votes={clicks} highestIndex={getHighestVotes(clicks)} />
    </div>
  )
}

export default App