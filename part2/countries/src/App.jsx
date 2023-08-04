import { useEffect, useState } from 'react';
import { Countries, Country, Filter, Weather } from './components';
import { countryService, weatherService } from './services';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    countryService
      .getAll()
      .then((initialCountries) => {
        setCountries(initialCountries);
      })
      .catch((error) => {
        setCountries([]);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCountry(null);
  };

  let filteredCountries =
    filter === ''
      ? null
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        );

  const handleShowClick = (country) => {
    setCountry(country);
    weatherService
      .getWeather(country.capital[0])
      .then((weather) => {
        setWeather(weather);
      })
      .catch((error) => {
        setWeather(null);
      });
  };

  if (!countries) {
    return null;
  }

  return (
    <div className="App">
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {filteredCountries && country === null && (
        <Countries
          countries={filteredCountries}
          handleShowClick={handleShowClick}
        />
      )}
      {country && <Country country={country} />}
      {country && weather && <Weather weather={weather} />}
    </div>
  );
};

export default App;
