import chalk from 'chalk';

const printError = (error) => {
  console.log(chalk.bgRed(' Error ') + ' ' + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(' Success ') + ' ' + message);
};

const printHelp = () => {
  console.log(
    `
      ${chalk.bgCyan(' HELP ')}
      ${chalk.cyan('Without parameters')} - showing weather
      ${chalk.cyan('-c [CITY]')} for city selection
      ${chalk.cyan('-h')} for help
      ${chalk.cyan('-t [API_KEY]')} for saving token
    `
  );
};

const printWeather = (response) => {
    console.log(
    `
      ${chalk.bgYellowBright(' WEATHER ')} The weather in the city ${response.name}
      ${response.weather[0].description}
      Temperature: ${response.main.temp} (feels like ${response.main.feels_like})
      Humidity: ${response.humidity}
      Wind speed: ${response.wind.speed}
    `
  );
};

export { printError, printSuccess, printHelp, printWeather };