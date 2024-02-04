import { resolve, parse } from 'node:path';
import { readdir } from 'node:fs/promises';
import { InvalidInputError, OperationFailedError } from '../utils/error/index.js';

const DIRENT_TYPES = {
  DIRECTORY: 'directory',
  FILE: 'file',
  SYMBOLIC_LINK: 'symlink',
};

export class NavigationService {
  cd(path) {
    if (!path) {
      throw new InvalidInputError();
    }

    try {
      process.chdir(resolve(path));
    } catch {
      throw new OperationFailedError();
    }
  }

  up() {
    const cwd = process.cwd();
    const root = parse(cwd).root;

    if (cwd === root) return;

    process.chdir('..');
  }

  async ls() {
    try {
      const directoryContent = await readdir(process.cwd(), {
        withFileTypes: true,
      });

      const mappedContent = directoryContent.map((item) => {
        const resultItem = { name: item.name, type: 'unknown' };

        if (item.isDirectory()) {
          resultItem.type = DIRENT_TYPES.DIRECTORY;
        }

        if (item.isFile()) {
          resultItem.type = DIRENT_TYPES.FILE;
        }

        if (item.isSymbolicLink()) {
          resultItem.type = DIRENT_TYPES.SYMBOLIC_LINK;
        }

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
    } catch (err) {
      console.log(err);
      throw new OperationFailedError();
    }
  }
}
