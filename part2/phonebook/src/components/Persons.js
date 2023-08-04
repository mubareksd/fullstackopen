const Persons = ({ persons, handleDeleteBtn }) => (
  <div>
    {persons.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
        <button onClick={() => handleDeleteBtn(person.id)}>delete</button>
      </p>
    ))}
  </div>
);

export default Persons;
