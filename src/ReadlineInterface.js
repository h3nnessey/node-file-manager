import { createInterface } from "node:readline/promises";
import { Logger } from "./utils/cli/Logger.js";

export class ReadlineInterface {
  #readline;
  #logger;

  constructor() {
    this.#readline = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "≫ ",
    });

    this.#logger = new Logger();
  }

  onLine(callback) {
    this.#readline.on("line", async (line) => {
      if (line === ".exit") {
        return this.#onExit();
      }

      try {
        await callback(line);

        this.#logger.logCwd();
        this.#readline.prompt();
      } catch (error) {
        this.#logger.logError(error);
      }
    });
  }

  #onStart() {
    this.#logger.logWelcome();
    this.#logger.logCwd();
    this.#readline.prompt();
  }

  #onExit() {
    this.#logger.logBye();
    process.exit();
  }

  run() {
    this.#onStart();
    this.#readline.on("SIGINT", this.#onExit.bind(this));
  }
}
