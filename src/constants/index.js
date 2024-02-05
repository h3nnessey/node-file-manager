export const CMD_CONFIG = {
  QUOTES: {
    TYPES: ['"'],
    REGEXP_GROUP: /"(.*?)"/gm,
    REGEXP_SINGLE: /"/gm,
  },
  COMMANDS: new Map([
    ['cd', { type: 'navigation', argsCount: 1 }],
    ['up', { type: 'navigation', argsCount: 0 }],
    ['ls', { type: 'navigation', argsCount: 0 }],
    ['os', { type: 'os', argsCount: 1 }],
    ['hash', { type: 'hash', argsCount: 1 }],
    ['cat', { type: 'fs', argsCount: 1 }],
    ['add', { type: 'fs', argsCount: 1 }],
    ['rn', { type: 'fs', argsCount: 2 }],
    ['cp', { type: 'fs', argsCount: 2 }],
    ['mv', { type: 'fs', argsCount: 2 }],
    ['rm', { type: 'fs', argsCount: 1 }],
    ['compress', { type: 'archive', argsCount: 2 }],
    ['decompress', { type: 'archive', argsCount: 2 }],
  ]),
};

export const DIRENT_TYPES = {
  DIRECTORY: 'directory',
  FILE: 'file',
  SYMBOLIC_LINK: 'symlink',
  UNKNOWN: 'unknown',
};
