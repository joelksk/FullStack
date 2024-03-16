import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Title = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Statistics = ({props}) => {
  if(props.counters.all === 0) {
    return (
      <div>
        <h3>
          No feedback Given
        </h3>
      </div>
    )
  }
  return(
    <div>
      <StatisticLine title={props.titles.good} counter={props.counters.good}/>
      <StatisticLine title={props.titles.neutral} counter={props.counters.neutral}/>
      <StatisticLine title={props.titles.bad} counter={props.counters.bad}/>
      <StatisticLine title={props.titles.all} counter={props.counters.all}/>
      <StatisticLine title={props.titles.average} counter={props.counters.average}/>
      <StatisticLine title={props.titles.positive} counter={props.counters.positive}/>
    </div>
  )
}

const StatisticLine = ({title, counter}) => {
  return (
    <div>
      <table>
          <tbody>
            <tr>
              <td>{title}</td>
              <td>{counter}</td>
            </tr>
          </tbody>
      </table>
    </div>
  ) 
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const props = {
    titles : {
      header: "Give Feedback",
      statistics: "Statistics",
      good: "Good",
      neutral: "Neutral",
      bad: "Bad",
      all: "All Comments",
      average: "Average",
      positive: "Positive"
    },
    counters: {
      good: good,
      neutral: neutral,
      bad: bad,
      all: total,
      average: average,
      positive: positive
    }

  }

  //crear los metodos para que incrementen y cuenten los comentarios

  const increaseGood = () => {
    const updateGood = good + 1;
    setGood(updateGood)
    const updateTotal = total + 1;
    setTotal(updateTotal)
    const updateAverage = ((updateGood - bad) / updateTotal)
    setAverage(updateAverage)
    const updatePositive = (updateGood/updateTotal)
    setPositive(updatePositive)
  };
  const increaseNeutral = () => {
    const updateNeutral = neutral + 1;
    setNeutral(updateNeutral)
    const updateTotal = total + 1;
    setTotal(updateTotal)
    setPositive(good/updateTotal)
  };
  const increaseBad = () => {
    const updateBad = bad + 1;
    setBad(updateBad)
    const updateTotal = total + 1;
    setTotal(updateTotal)
    const updateAverage = ((good - updateBad) / updateTotal)
    setAverage(updateAverage)
    setPositive(good/updateTotal)
  };

  return (
    <div>
      <Title title={props.titles.header} />
      <br />
      <Button onClick={increaseGood} text={props.titles.good}></Button>
      <Button onClick={increaseNeutral} text={props.titles.neutral}></Button>
      <Button onClick={increaseBad} text={props.titles.bad}></Button>
      <br />
      <Title title={props.titles.statistics} />
      <Statistics props={props} />
    </div>
  )
}

export default App
