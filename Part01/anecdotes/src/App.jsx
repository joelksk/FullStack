import { useState } from 'react'

const points = [0,0,0,0,0,0,0,0]

const AmmountVotes = (props) => {
  if(props.points[props.anecdoteNumber] ===0) {
    return(
      <div>
        <h3>This anectode has not voted yet</h3>
      </div>
    )
  }
  return(
    <div>
      <h3>This anectode has {props.points[props.anecdoteNumber]} votes</h3>
    </div>
  )
}

const AnedoteOfDay = (props) => {
  return(
    <div>
      <h1>Anecote of the day.</h1>
      <p>{props.anecdote}</p>
    </div>
  )
}

const TopAnecdote = (props) => {
  return (
    <div>
      <h1>Anecdote with most votes total: {props.totalPoints}</h1>
      <p>{props.top}</p>
    </div>
  )
}

const App = () => {

  const [selected, setSelected] = useState(0)
  const [topAnecdote, setTopAnecdote] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const randomAnecdote = () => {
    const number = Math.floor(Math.random() * anecdotes.length)
    setSelected(number)
  }

  const vote = () => {
      const anecdoteActual = selected;
      const updatePoints = points[anecdoteActual] + 1;
      points[anecdoteActual] = updatePoints;
      searchTopAnecote();
  }

  const searchTopAnecote = () => {
      const anecdoteWithMostVotes = points.indexOf(points.reduce((previus,current) => {
      return previus > current ? previus : current;
    }))
    setTopAnecdote(anecdoteWithMostVotes)
  }

  return (
    <div>
      <AnedoteOfDay anecdote={anecdotes[selected]} />
      <AmmountVotes points={points} anecdoteNumber={selected}/>
      <button onClick={vote}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>
      <TopAnecdote top={anecdotes[topAnecdote]} totalPoints={points[topAnecdote]} />
    </div>

  )
}

export default App
