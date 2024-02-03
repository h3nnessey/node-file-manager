import { userInfo, EOL } from "node:os";

export class Logger {
  #username;

  constructor() {
    this.#username = this.#getUsernameFromProcessArgv();
  }

  logCwd() {
    console.log(`You are currently in ${process.cwd()}`);
  }

  logError(error) {
    console.log(
      error instanceof Error ? error.message : "Something went wrong..."
    );
  }

  logWelcome() {
    console.log(`Welcome to the File Manager, ${this.#username}!`);
  }

  logBye() {
    console.log(
      `${EOL}Thank you for using File Manager, ${this.#username}, goodbye!`
    );
  }

  #getUsernameFromProcessArgv() {
    const usernameCandidate = process.argv.find((candidate) =>
      candidate.startsWith("--username=")
    );

    if (usernameCandidate) {
      return usernameCandidate.split("=")[1];
    }

    return userInfo().username;
  }
}
