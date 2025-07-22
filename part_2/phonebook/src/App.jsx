import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notifcation, setNotification] = useState(null)

  const handleNameChange = e => setNewName(e.target.value);
  const handleNumberChange = e => setNewNumber(e.target.value);
  const handleFilterChange = e => setNewFilter(e.target.value)

  const nameExists = (name) => {
    return persons.map(p => p.name).includes(name)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (nameExists(newName)) {
      const targetPerson = persons.find(p => p.name === newName)
      return updateNumber(targetPerson)
    }

    const personObj = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }

    personService
      .create(personObj)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification(`Added ${returnedPerson.name}`)
      })
  }

  const updateNumber = (person) => {
    if (window.confirm(`${person.name} is already added to phonebook, replace \
the old number with a new one?`)) {
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
            setNewName('')
            setNewNumber('')
            setNotification(`Updated the number for ${returnedPerson.name}`)
          })
          .catch(error => {
            alert(`${person.name} was already deleted from server`)
          })
      }
  }

  const deletePerson = (id) => {
    const targetPerson = persons.find(p => p.id === id)
    const name = targetPerson.name

    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
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
      <Notification message={notifcation}/>
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
      <Persons persons={personsToShow} filter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App