import { useState } from 'react';

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
);

const Anecdote = ({ anecdote, voteNum }) => (
  <div>
    <p>{anecdote}</p>
    <p>has {voteNum} votes</p>
  </div>
)

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes);
  if (maxVotes === 0) {
    return <div>No votes yet</div>;
  }

  const mostVoted = anecdotes[votes.findIndex((v) => v === maxVotes)];

  return <Anecdote anecdote={mostVoted} voteNum={maxVotes}/>
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
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = (selected) => {
    setVotes(votes => {
      const copy = [...votes];
      copy[selected] += 1;
      return copy;
    });
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdote={anecdotes[selected]} voteNum={votes[selected]}/>
      <div>
        <Button onClick={() => handleVote(selected)} text='vote'/>
        <Button onClick={handleNext} text='next anecdote'/>
      </div>
      <h2>Anecdote with most votes</h2>
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  );
};

export default App;