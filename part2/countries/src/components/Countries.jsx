const Countries = ({ countries, handleShowClick }) => (
  <div className="Countries">
    {countries.map((country) => (
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => handleShowClick(country)}>show</button>
      </div>
    ))}
  </div>
);

export default Countries;
