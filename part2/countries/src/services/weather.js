import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const apiKey = process.env.REACT_APP_API_KEY;

const getWeather = async (city) => {
  const response = await axios.get(`${baseUrl}?q=${city}&appid=${apiKey}`);
  return response.data;
};

const weatherService = { getWeather };

export default weatherService;
