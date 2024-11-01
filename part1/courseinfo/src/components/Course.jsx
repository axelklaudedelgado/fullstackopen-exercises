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

const Content = ({parts}) => {  
    const partElements = parts.map((part) => <Part part={part.name} exerciseCount={part.exercises} key={part.id} />)

    return (
        <div>
        {partElements}
        </div>
    )
}

const Total  = ({parts}) => {  
    const totalCount = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    return (
        <div>
        <b>total of {totalCount} exercises</b>
        </div>
    )
}

const Course = ({course}) => {
    return(
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
    )
};

export default Course;