import { getKey, TOKEN_DICTIONARY } from './storage.service.js';
import axios from 'axios';

const getWeather = async (city) => {
  const token = await getKey(TOKEN_DICTIONARY.token);

  if (!token) {
    throw new Error('Api key was not set. Add it by command -t [API_KEY]');
  };

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      units: 'metric'
    }
  })

  return data;
};

export { getWeather };