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

export { printError, printSuccess, printHelp };