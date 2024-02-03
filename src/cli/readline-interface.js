import { createInterface } from 'node:readline/promises';
import { Logger } from './logger.js';

export class ReadlineInterface {
  #readline;
  #logger;

  constructor() {
    this.#readline = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '≫ ',
    });

    this.#logger = new Logger();
  }

  onLine(callback) {
    this.#readline.on('line', async (line) => {
      const trimmedLine = line.trim();

      if (!line) {
        return this.#readline.prompt();
      }

      if (trimmedLine === '.exit') {
        return this.#onExit();
      }

      try {
        await callback(trimmedLine);

        this.#logger.logCwd();
      } catch (error) {
        this.#logger.logError(error);
      }

      this.#readline.prompt();
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
    this.#readline.on('SIGINT', this.#onExit.bind(this));
  }
}
