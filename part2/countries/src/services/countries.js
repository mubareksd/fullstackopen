import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = () => {
  return axios.get(`${baseUrl}/all`).then((response) => response.data);
};

const getByName = (name) => {
  return axios.get(`${baseUrl}/name/${name}`).then((response) => response.data);
};

const countryService = { getAll, getByName };

export default countryService;
