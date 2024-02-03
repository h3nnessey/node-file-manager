import { ProcessService } from "../services/process-service.js";
import { OsService } from "../services/os-service.js";
import { InvalidInputError } from "../utils/error/index.js";

const CMD_CONFIG = new Map([
  ["cd", { type: "process", argsCount: 1 }],
  ["up", { type: "process", argsCount: 0 }],
  ["os", { type: "os", argsCount: 1 }],
]);

export class CommandsController {
  constructor() {
    this.processService = new ProcessService();
    this.osService = new OsService();
  }

  async process(cmd, args) {
    await this.processService[cmd](args);
  }

  async os(_, args) {
    await this.osService.exec(args);
  }

  async exec(line) {
    try {
      const [cmd, cmdType, args] = this.#parseLineArguments(line);

      await this[cmdType](cmd, args);
    } catch (error) {
      throw error;
    }
  }

  #parseLineArguments(line) {
    const [cmd, ...args] = line.split(" ");
    const commandConfig = CMD_CONFIG.get(cmd);
    const trimmedArgs = args.join(" ").trim(); // after split(' ') -> [''] if nothing passed

    if (!commandConfig) {
      throw new InvalidInputError();
    }

    // need to parse in loop first

    return [cmd, commandConfig.type, trimmedArgs];
  }
}
