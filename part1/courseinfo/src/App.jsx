const Header = (props) => {  
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {  
  return (
    <div>
      <p>
        {props.part} {props.exerciseCount}
      </p>
    </div>
  )
}

const Content = (props) => {  
  const partElements = props.parts.map((part) => <Part part={part.name} exerciseCount={part.exercises} />)

  return (
    <div>
      {partElements}
    </div>
  )
}

const Total  = (props) => {  
  const totalCount = props.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
  return (
    <div>
      <p>Number of exercises {totalCount}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}  />
      <Total parts={course.parts} />
    </div>
  )
}

export default App