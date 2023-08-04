const Weather = ({ weather }) => {
  return (
    <div className="weather">
      <h2>Weather in {weather.name}</h2>
      <div>
        <strong>temperature:</strong>{' '}
        {Math.round((weather.main.temp - 273.15) * 100) / 100} Celsius
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </div>
        <div>
          <strong>wind:</strong> {weather.wind.speed} m/s
        </div>
      </div>
    </div>
  );
};

export default Weather;
