const Header = ({ course }) => <h2>{ course.name }</h2>

const Content = ({ course }) => (
  <div>
    {course.parts.map(p => 
      <Part key={p.id} part={p}/>)}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>total of {total} exercises</p>
}

const Course = ({ course }) => (
  <div>
    <Header course={course}/>
    <Content course={course}/>
    <Total course={course}/>
  </div>
)

export default Course