import axios from 'axios';
import themoviedbConfig from '../../config/themoviedb';

const movieAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: themoviedbConfig.apiKey,
  },
});

export default movieAPI;
