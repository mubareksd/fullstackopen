import { useEffect, useState } from 'react';
import { Filter, Notification, PersonForm, Persons } from './components';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({
    content: '',
    type: '',
  });

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      const person = persons.find((p) => p.name === newName);
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(person.id, {
            ...person,
            number: newNumber,
          })
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson))
            );
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            setMessage({
              content: `Information of ${person.name} has already been removed from server`,
              type: 'error',
            });
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setMessage({
        content: `Added ${returnedPerson.name}`,
        type: 'success',
      });
      setNewName('');
      setNewNumber('');
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filtered =
    filter === null
      ? persons
      : persons.filter((person) => person.name.includes(filter));

  const handleDeleteBtn = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setMessage({
            content: `Information of ${person.name} has already been removed from server`,
            type: 'error',
          });
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.content} className={message.type} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filtered} handleDeleteBtn={handleDeleteBtn} />
    </div>
  );
};

export default App;
