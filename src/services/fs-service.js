import { resolve, parse } from 'node:path';
import { writeFile, rm } from 'node:fs/promises';
import { InvalidInputError, OperationFailedError } from '../utils/error/index.js';
import { isFile } from '../utils/path/is-file.js';

export class FsService {
  async add([path]) {
    const filePath = resolve(path);
    const fileDir = parse(filePath).dir;

    if (process.cwd() !== fileDir) {
      throw new InvalidInputError();
    }

    try {
      await writeFile(filePath, '', { flag: 'wx' });
    } catch {
      throw new OperationFailedError();
    }
  }

  async rm([path]) {
    const filePath = resolve(path);
    const isPathToFile = await isFile(filePath);

    if (isPathToFile === false) {
      throw new InvalidInputError();
    }

    try {
      await rm(filePath);
    } catch {
      throw new OperationFailedError();
    }
  }
}
