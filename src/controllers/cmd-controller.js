import { NavigationService } from '../services/navigation-service.js';
import { OsService } from '../services/os-service.js';
import { InvalidInputError } from '../utils/error/index.js';

const CMD_CONFIG = new Map([
  ['cd', { type: 'navigation', argsCount: 1 }],
  ['up', { type: 'navigation', argsCount: 0 }],
  ['ls', { type: 'navigation', argsCount: 0 }],
  ['os', { type: 'os', argsCount: 1 }],
]);

export class CommandsController {
  constructor() {
    this.navigationService = new NavigationService();
    this.osService = new OsService();
  }

  async navigation(cmd, args) {
    await this.navigationService[cmd](args);
  }

  async os(_, args) {
    this.osService.exec(args);
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
    const [cmd, ...args] = line.split(' ');
    const commandConfig = CMD_CONFIG.get(cmd);
    const trimmedArgs = args.join(' ').trim(); // after split(' ') -> [''] if nothing passed

    if (!commandConfig) {
      throw new InvalidInputError();
    }

    // need to parse in loop first

    return [cmd, commandConfig.type, trimmedArgs];
  }
}
