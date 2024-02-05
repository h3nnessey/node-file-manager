import {
  HashService,
  NavigationService,
  OsService,
  ArchiveService,
  FsService,
} from '../services/index.js';
import { InvalidInputError } from '../utils/error/index.js';
import { CMD_CONFIG } from '../constants/index.js';

export class CommandsController {
  constructor() {
    this.navigationService = new NavigationService();
    this.osService = new OsService();
    this.hashService = new HashService();
    this.archiveService = new ArchiveService();
    this.fsService = new FsService();
    this.config = CMD_CONFIG;
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

  async archive(cmd, args) {
    await this.archiveService[cmd](args);
  }

  async fs(cmd, args) {
    await this.fsService[cmd](args);
  }

  async exec(line) {
    try {
      const [cmd, cmdType, args] = this.#parseLine(line);

      await this[cmdType](cmd, args);
    } catch (error) {
      throw error;
    }
  }

  #parseLine = (lineToParse) => {
    const [cmd, ...args] = lineToParse.split(' ');
    const { COMMANDS, QUOTES } = this.config;
    const cmdConfig = COMMANDS.get(cmd);

    if (!cmdConfig) {
      throw new InvalidInputError();
    }

    let currentArgs = args.join(' ').trim();
    let currentArg = '';

    const argsResult = [];

    while (currentArgs.length) {
      if (QUOTES.TYPES.includes(currentArgs[0])) {
        const firstEntry = currentArgs.match(QUOTES.REGEXP_GROUP)[0];

        currentArgs = currentArgs.replace(firstEntry, '').trim();
        currentArg = firstEntry.replaceAll(QUOTES.REGEXP_SINGLE, '');
      } else {
        currentArg = currentArgs.split(' ')[0];
        currentArgs = currentArgs.replace(currentArg, '').trim();
      }

      argsResult.push(currentArg);
      currentArg = '';
    }

    if (argsResult.length !== cmdConfig.argsCount) {
      throw new InvalidInputError();
    }

    return [cmd, cmdConfig.type, argsResult];
  };
}
