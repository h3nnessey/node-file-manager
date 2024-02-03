import { createInterface } from "node:readline/promises";
import { userInfo } from "node:os";

export class ReadlineInterface {
  #readline;
  #username;

  constructor() {
    this.#readline = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "≫ ",
    });

    this.#username = this.#getUsernameFromProcessArgv();
  }

  prompt() {
    this.#readline.prompt();
  }

  onLine(callback) {
    this.#readline.on("line", callback);
  }

  parseInputArguments(line) {
    // return os/fs/hash/zip etc + arguments
    return [1, 2];
  }

  #printGreetings() {
    console.log(`Welcome to the File Manager, ${this.#username}`);
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

  run() {
    this.#printGreetings();
    this.prompt();
  }
}
