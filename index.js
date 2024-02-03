import { ReadlineInterface } from "./src/ReadlineInterface.js";

class App {
  constructor() {
    this.readline = new ReadlineInterface(/* username */);
    // this.logger = new Logger();
    // this.controller = new CommandsController();
  }

  run() {
    const { readline, logger, controller } = this;

    readline.run();

    readline.onLine(async (line) => {
      try {
        const [cmd, args] = readline.parseInputArguments(line);

        // await controller.execCommand(cmd, args);
        // logger.logCwd(process.cwd());
      } catch (error) {
        // logger.logError(error);
      }
    });
  }
}

const app = new App();

app.run();
