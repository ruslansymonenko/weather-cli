#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
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

const getForecast = async () => {
  try {
    const weather = await getWeather(process.env.CITY);
    console.log(weather);
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

  };

  if (args.t) {
    return saveToken(args.t)
  };

  getForecast();
};

initCLI();