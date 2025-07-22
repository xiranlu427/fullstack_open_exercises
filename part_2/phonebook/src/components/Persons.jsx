const Person = ({ person, deletePerson }) => (
  <p>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></p>
)

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(p => (
        <Person 
          key={p.id} 
          person={p}
          deletePerson={deletePerson}/>
      ))}
    </div>
  )
}

export default Persons