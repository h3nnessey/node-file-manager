import { ProcessService } from "../../services/process/ProcessService.js";

export class CommandsController {
  #processService;

  constructor() {
    this.#processService = new ProcessService();
  }

  process(cmd, args) {
    this.#processService[cmd](args);
  }

  async exec(line) {
    const [command, args] = this.#parseLineArguments(line);
    // const commandType = this.#getCommandType(command);
    // try {
    //   await this[commandType](command, args);
    // } catch (error) {
    //   throw error;
    // }
  }

  #getCommandType(command) {
    // switch (command) {
    // }
  }

  #parseLineArguments(line) {
    const cmd = "rn";
    const args = ["1", "2"];

    return [cmd, args];
  }
}
