import { homedir } from 'node:os';
import { ReadlineInterface } from './cli/readline-interface.js';
import { CommandsController } from './controllers/cmd-controller.js';

export class App {
  #readline;
  #controller;

  constructor() {
    this.#readline = new ReadlineInterface();
    this.#controller = new CommandsController();
  }

  run() {
    process.chdir(homedir());

    this.#readline.run();

    this.#readline.onLine(async (line) => await this.#controller.exec(line));
  }
}
