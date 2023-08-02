#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKey } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

const saveToken = async (token) => {
  if(!token.length) {
    printError('Token was not sent!')
    return
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token was saved')
  } catch (err) {
    printError(err.message);
  }
}

const saveCity = async (city) => {
  if(!city.length) {
    printError('City was not sent!')
    return
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('City was saved')
  } catch (err) {
    printError(err.message);
  }
}

const getForecast = async () => {
  try {
    const city = process.env.CITY || (await getKey(TOKEN_DICTIONARY.city));

    if (!city) {
      printError('No city specified. Use -c flag to set a city.');
      return;
    }

    const weather = await getWeather(city);
    printWeather(weather);
  } catch (err) {
    if(err?.response?.status == 404) {
      printError('City not found')
    } else if(err?.response?.status == 401) {
      printError('Invalid token');
    } else {
      printError(err?.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  };

  if (args.c) {
    saveCity(args.c);
  };

  if (args.t) {
    return saveToken(args.t)
  };

  if (args.s) {
    getForecast();
  }
};

initCLI();