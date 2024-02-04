import { InvalidInputError } from '../error/index.js';

const CMD_CONFIG = new Map([
  ['cd', { type: 'navigation', argsCount: 1 }],
  ['up', { type: 'navigation', argsCount: 0 }],
  ['ls', { type: 'navigation', argsCount: 0 }],
  ['os', { type: 'os', argsCount: 1 }],
  ['hash', { type: 'hash', argsCount: 1 }],
]);

export const parseLineArguments = (line) => {
  const [cmd, ...args] = line.split(' ');
  const commandConfig = CMD_CONFIG.get(cmd);
  const trimmedArgs = args.join(' ').trim(); // after split(' ') -> [''] if nothing passed

  if (!commandConfig) {
    throw new InvalidInputError();
  }

  // need to parse in loop first

  return [cmd, commandConfig.type, trimmedArgs];
};
