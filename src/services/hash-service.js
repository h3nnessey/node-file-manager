import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { OperationFailedError } from '../utils/error/index.js';

export class HashService {
  async hash(path) {
    const readStream = createReadStream(resolve(path));
    const hash = createHash('sha256');

    try {
      await pipeline(readStream, hash);

      console.log(hash.digest('hex'));
    } catch {
      throw new OperationFailedError();
    }
  }
}
