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

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  };

  if (args.s) {

  };

  if (args.t) {
    return saveToken(args.t)
  };

  getWeather('london');
};

initCLI();