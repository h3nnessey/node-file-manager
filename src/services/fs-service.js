import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { OperationFailedError } from '../utils/error/index.js';

export class FsService {
  async add(path) {
    try {
      await writeFile(resolve(path), '', { flag: 'wx' });
    } catch {
      throw new OperationFailedError();
    }
  }
}
