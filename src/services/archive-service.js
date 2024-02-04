import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, constants } from 'node:zlib';
import { resolve, extname } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { InvalidInputError, OperationFailedError } from '../utils/error/index.js';
import { isFile } from '../utils/path/index.js';

export class ArchiveService {
  brotliExtname = '.br';

  async compress([src, dest]) {
    const sourcePath = resolve(src);
    const destinationPath = resolve(dest);

    const srcIsFile = await isFile(sourcePath);
    const destIsArchive = extname(destinationPath) === this.brotliExtname;

    if (!srcIsFile || !destIsArchive) {
      throw new InvalidInputError();
    }

    try {
      const brotliCompress = createBrotliCompress({
        params: {
          [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MIN_QUALITY,
        },
      });

      const readStream = createReadStream(sourcePath);
      const writeStream = createWriteStream(destinationPath, { flags: 'wx' });

      await pipeline(readStream, brotliCompress, writeStream);
    } catch (error) {
      throw new OperationFailedError();
    }
  }

  async decompress() {}
}
