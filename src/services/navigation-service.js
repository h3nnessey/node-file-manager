import { resolve, sep } from 'node:path';
import { readdir } from 'node:fs/promises';
import { InvalidInputError, OperationFailedError } from '../utils/error/index.js';
import { DIRENT_TYPES } from '../constants/index.js';

export class NavigationService {
  cd([path]) {
    if (!path) {
      throw new InvalidInputError();
    }

    const isDrivePath = process.platform === 'win32' && path.length === 2 && path[1] === ':';

    if (isDrivePath) path += sep;

    try {
      process.chdir(resolve(path));
    } catch {
      throw new OperationFailedError();
    }
  }

  up() {
    try {
      process.chdir('..');
    } catch {
      throw new OperationFailedError();
    }
  }

  async ls() {
    try {
      const directoryContent = await readdir(process.cwd(), {
        withFileTypes: true,
      });

      const mappedContent = directoryContent.map((item) => {
        const resultItem = { name: item.name, type: DIRENT_TYPES.UNKNOWN };

        if (item.isDirectory()) resultItem.type = DIRENT_TYPES.DIRECTORY;

        if (item.isFile()) resultItem.type = DIRENT_TYPES.FILE;

        if (item.isSymbolicLink()) resultItem.type = DIRENT_TYPES.SYMBOLIC_LINK;

        return resultItem;
      });

      const directories = mappedContent
        .filter((item) => item.type === DIRENT_TYPES.DIRECTORY)
        .sort();

      const files = mappedContent.filter((item) => item.type === DIRENT_TYPES.FILE).sort();

      const symlinks = mappedContent
        .filter((item) => item.type === DIRENT_TYPES.SYMBOLIC_LINK)
        .sort();

      console.table(directories.concat(files, symlinks));
    } catch {
      throw new OperationFailedError();
    }
  }
}
