import { homedir } from "node:os";
import { ReadlineInterface } from "./ReadlineInterface.js";
import { CommandsController } from "./controllers/cmd/CommandsController.js";

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
