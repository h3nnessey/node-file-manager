import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { InvalidInputError, OperationFailedError } from '../utils/error/index.js';
import { isFile } from '../utils/path/is-file.js';

export class HashService {
  async hash([path]) {
    const filePath = resolve(path);
    const isPathToFile = await isFile(filePath);

    if (isPathToFile === false) {
      throw new InvalidInputError();
    }

    const readStream = createReadStream(filePath);
    const hash = createHash('sha256');

    try {
      await pipeline(readStream, hash);

      console.log(hash.digest('hex'));
    } catch {
      throw new OperationFailedError();
    }
  }
}
