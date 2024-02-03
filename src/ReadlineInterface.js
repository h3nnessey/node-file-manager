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

  onLine(callback) {
    this.#readline.on("line", async (line) => {
      await callback(line);
      this.#readline.prompt();
    });
  }

  #onStart() {
    console.log(`Welcome to the File Manager, ${this.#username}!`);
    this.#readline.prompt();
  }

  #onExit() {
    // EOL
    console.log(
      `\nThank you for using File Manager, ${this.#username}, goodbye!`
    );
    process.exit();
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
    this.#onStart();
    this.#readline.on("SIGINT", this.#onExit.bind(this));
  }
}
