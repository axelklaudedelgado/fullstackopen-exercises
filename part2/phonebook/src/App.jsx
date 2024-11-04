import { useState, useEffect } from 'react';

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

const Person = ({key, name, number}) => <p key={key}>{name} {number}</p>

const Persons = ({personList}) => <div>{personList.map(person => <Person key={person.id} name={person.name} number={person.number}/>)}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    setPersons(persons.concat(nameObject))
    setNewName('');
    setNewNumber('');
  };

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
      <Filter value={filterText} onFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} onNameChange={handleNameChange} numberValue={newNumber} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personList={filteredPersons} />
    </div>
  );
};

export default App;
