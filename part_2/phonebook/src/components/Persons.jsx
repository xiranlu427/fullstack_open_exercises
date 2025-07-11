const Person = ({ person }) => (
  <p>{person.name} {person.number}</p>
)

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(p => (
        <Person key={p.id} person={p}/>
      ))}
    </div>
  )
}

export default Persons