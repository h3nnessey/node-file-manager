import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress, constants } from 'node:zlib';
import { resolve, extname } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { InvalidInputError, OperationFailedError } from '../utils/error/index.js';
import { isFile } from '../utils/path/index.js';

export class ArchiveService {
  brotliExtname = '.br';

  // error if: src doesn't exists, src is archive, src is directory, dest is not archive, dest doesn't exists
  async compress([src, dest]) {
    const sourcePath = resolve(src);
    const destinationPath = resolve(dest);

    const srcIsFile = await isFile(sourcePath);
    const srcIsArchive = extname(sourcePath) === this.brotliExtname;
    const destIsArchive = extname(destinationPath) === this.brotliExtname;

    if (srcIsFile === null) throw new OperationFailedError();

    if (srcIsArchive || srcIsFile === false || !destIsArchive) {
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
    } catch {
      throw new OperationFailedError();
    }
  }

  // error if: src doesn't exists, src is not a file, src is not an archive (.br), dest is archive too, dest doesn't exists
  async decompress([src, dest]) {
    const sourcePath = resolve(src);
    const destinationPath = resolve(dest);

    const srcIsFile = await isFile(sourcePath);
    const srcIsArchive = extname(sourcePath) === this.brotliExtname;
    const destIsArchive = extname(destinationPath) === this.brotliExtname;

    if (srcIsFile === null) throw new OperationFailedError();

    if (srcIsFile === false || !srcIsArchive || destIsArchive) throw new InvalidInputError();

    try {
      const brotliDecompress = createBrotliDecompress();

      const readStream = createReadStream(sourcePath);
      const writeStream = createWriteStream(destinationPath, { flags: 'wx' });

      await pipeline(readStream, brotliDecompress, writeStream);
    } catch {
      throw new OperationFailedError();
    }
  }
}
