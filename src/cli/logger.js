import { userInfo, EOL } from 'node:os';
import { colorize } from '../utils/cli/colorize.js';

export class Logger {
  #username;

  constructor() {
    this.#username = this.#getUsernameFromProcessArgv();
  }

  logCwd() {
    console.log(`You are currently in ${colorize(process.cwd(), 'cyan')}`);
  }

  logError(error) {
    console.log(colorize(error instanceof Error ? error.message : 'Operation failed', 'red'));
  }

  logWelcome() {
    console.log(`Welcome to the File Manager, ${colorize(this.#username, 'yellow')}!`);
  }

  logBye() {
    console.log(
      `${EOL}Thank you for using File Manager, ${colorize(this.#username, 'yellow')}, goodbye!`,
    );
  }

  #getUsernameFromProcessArgv() {
    const usernameCandidate = process.argv.find((candidate) => candidate.startsWith('--username='));

    if (usernameCandidate) {
      return usernameCandidate.split('=')[1];
    }

    return userInfo().username;
  }
}
