import { createInterface } from 'node:readline/promises';
import { clearLine, cursorTo } from 'node:readline';
import { Logger } from './logger.js';
import { colorize } from '../utils/cli/colorize.js';

export class ReadlineInterface {
  #readline;
  #logger;

  constructor() {
    this.#readline = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: colorize('$ ', 'green'),
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

        this.#clear();
      } catch (error) {
        this.#logger.logError(error);
      }

      this.#logger.logCwd();
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

  #clear() {
    clearLine(process.stdout, 0);
    cursorTo(process.stdout, 0);
  }

  run() {
    this.#onStart();
    this.#readline.on('SIGINT', this.#onExit.bind(this));
  }
}
