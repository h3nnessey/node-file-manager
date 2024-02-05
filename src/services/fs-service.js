import { resolve, parse } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { InvalidInputError, OperationFailedError } from '../utils/error/index.js';

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
}
