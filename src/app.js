import { ReadlineInterface } from "./ReadlineInterface.js";
import { CommandsController } from "./controllers/cmd/CommandsController.js";

export class App {
  constructor() {
    this.readline = new ReadlineInterface();
    this.controller = new CommandsController();
  }

  run() {
    const { readline, controller } = this;

    readline.run();

    readline.onLine(async (line) => {
      try {
        await controller.exec(line);
        // this.logger.logCwd();
      } catch (error) {
        // this.logger.logError(error)
      }
    });
  }
}
