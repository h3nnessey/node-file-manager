import { HashService, NavigationService, OsService } from '../services/index.js';
import { parseLineArguments } from '../utils/cli/parse-line-arguments.js';
export class CommandsController {
  constructor() {
    this.navigationService = new NavigationService();
    this.osService = new OsService();
    this.hashService = new HashService();
  }

  async navigation(cmd, args) {
    await this.navigationService[cmd](args);
  }

  async os(_, cmd) {
    this.osService.exec(cmd);
  }

  async hash(cmd, args) {
    await this.hashService[cmd](args);
  }

  async exec(line) {
    try {
      const [cmd, cmdType, args] = parseLineArguments(line);

      await this[cmdType](cmd, args);
    } catch (error) {
      throw error;
    }
  }
}
