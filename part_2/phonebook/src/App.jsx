import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = e => setNewName(e.target.value);
  const handleNumberChange = e => setNewNumber(e.target.value);
  const handleFilterChange = e => setNewFilter(e.target.value)

  const nameExists = (name) => {
    return persons.map(p => p.name).includes(name)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (nameExists(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const PersonObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    setPersons(persons.concat(PersonObj))
    setNewName('')
  }

  const filteredPersons = (persons, query) => {
    if (query.toLowerCase() === '') {
      return persons
    }

    return persons.filter(p => {
      return (
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.number.toLowerCase().includes(query.toLowerCase())
      )
    })
  }

  const personsToShow = filteredPersons(persons, newFilter)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={newFilter}/>
      <h2>Add a new</h2>
      <PersonForm 
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} filter={newFilter}/>
    </div>
  )
}

export default App