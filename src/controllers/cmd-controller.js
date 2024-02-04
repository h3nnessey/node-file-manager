import {
  HashService,
  NavigationService,
  OsService,
  ArchiveService,
  FsService,
} from '../services/index.js';
import { InvalidInputError } from '../utils/error/index.js';
import { CMD_CONFIG } from '../constants/index.js';

// add new_file_name should contain extname?
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
    const {
      COMMANDS,
      QUOTES: { REGEXP_GROUP, REGEXP_SINGLE, TYPES },
    } = this.config;
    const cmdConfig = COMMANDS.get(cmd);

    if (!cmdConfig) {
      throw new InvalidInputError();
    }

    let argsStringified = args.join(' ').trim();

    const parsedArgs = [];

    while (argsStringified.length) {
      const quoteCandidate = argsStringified[0];

      if (TYPES.includes(quoteCandidate)) {
        const matches = argsStringified.match(REGEXP_GROUP);

        const noQuotesMatches = matches.map((match) => match.replaceAll(REGEXP_SINGLE, ''));

        matches.forEach((match) => {
          argsStringified = argsStringified.replace(match, '').trim();
        });

        parsedArgs.push(...noQuotesMatches);
      } else {
        const firstOfArgs = argsStringified.split(' ')[0];

        argsStringified = argsStringified.replace(firstOfArgs, '').trim();

        parsedArgs.push(firstOfArgs);
      }
    }

    if (parsedArgs.length !== cmdConfig.argsCount) throw new InvalidInputError();

    const argsResult = parsedArgs.length > 1 ? parsedArgs : parsedArgs.toString();

    return [cmd, cmdConfig.type, argsResult];
  };
}
