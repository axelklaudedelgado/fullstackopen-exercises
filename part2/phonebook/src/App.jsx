import { useState, useEffect } from 'react';
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if(message.includes('removed')) {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const Filter = ({value, onFilterChange}) => {
  return(
  <div>filter shown with
    <input 
    type='text'
    value={value} 
    onChange={onFilterChange}
    />
  </div>
  )
}

const PersonForm = ({onSubmit, nameValue, onNameChange, numberValue, onNumberChange}) => {
  return(
    <form onSubmit={onSubmit} >
        <div>
          name: <input 
          value={nameValue} 
          onChange={onNameChange}
          required
          />
        </div>
        <div>number: <input
          type='tel' 
          pattern="(09|\+639)[0-9]{9}"
          value={numberValue}
          onChange={onNumberChange}
          required
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Person = ({name, number, onClick}) => <p>{name} {number} <button onClick={onClick}>delete</button></p>

const Persons = ({personList, filteredList, handleDeleteClick}) => {
  if (personList.length !== 0 && filteredList.length === 0) {
    return <p>No number matches the filter</p>
  } else if (personList.length === 0) {
    return <p>No numbers added</p>
  }

  return(
    <div>
      {filteredList.map(person => 
      <Person key={person.id} 
        name={person.name} 
        number={person.number} 
        onClick={() => handleDeleteClick(person.id)}/>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const showNotification = (message) => {
    setNotificationMessage(
      message
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName)
    
    if (existingPerson){
      if(existingPerson.number !== newNumber) {
        const id = existingPerson.id
        const updatedNumber = {...existingPerson, number: newNumber}

        if(window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)){
          personService
            .update(id, updatedNumber)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id === id ? returnedPerson : person))
              showNotification(`Updated ${returnedPerson.name}'s number`)
              setNewName('');
              setNewNumber('');
            })

            .catch(error => {
              console.error('Failed to update the number of person:', error);
              showNotification(`Information of ${existingPerson.name} has already been removed from server`)
              setPersons(persons.filter(person => person.id !== id))
              setNewName('');
              setNewNumber('');
            });
        } else {
          alert(`${newName} is already added to phonebook and number was not updated.`);
        }
      } else {
        alert(`${existingPerson.name} is already added to phonebook.`);
      }
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(nameObject)
      .then(returnedName => {
        setPersons(persons.concat(returnedName))
        showNotification(`Added ${returnedName.name}`)
        setNewName('');
        setNewNumber('');
      })
  };

  const deletePerson = (id) => {
    const person = persons.find(person =>person.id === id)

    if(window.confirm(`Delete ${person.name}?`)){
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`Deleted ${person.name}`)
        })
        .catch((error) => {
          console.error('Failed to delete the person:', error);
          alert(`Failed to delete ${person.name}.`);
        });
    }
  }

  useEffect(() => {
    setFilteredPersons(
      persons.filter(person => 
        person.name.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [persons, filterText]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter value={filterText} onFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} onNameChange={handleNameChange} numberValue={newNumber} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personList={persons} filteredList={filteredPersons} handleDeleteClick={deletePerson} />
    </div>
  );
};

export default App;
