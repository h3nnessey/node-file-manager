import { resolve, parse } from 'node:path';
import { writeFile, rm, rename } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
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

  async cat([path]) {
    const filePath = resolve(path);
    const isPathToFile = await isFile(filePath);

    if (isPathToFile === false) {
      throw new InvalidInputError();
    }

    try {
      const readStream = createReadStream(filePath);

      await pipeline(readStream, process.stdout, { end: false });
    } catch {
      throw new OperationFailedError();
    }
  }

  // (do not pass pathLike as new_file_name)
  async rn([pathToFile, newName]) {
    const oldPath = resolve(pathToFile);
    const oldPathDir = parse(oldPath).dir;

    const newPath = resolve(oldPathDir, newName);
    const newPathDir = parse(newPath).dir;

    if (oldPathDir !== newPathDir) {
      throw new InvalidInputError();
    }

    try {
      await rename(oldPath, newPath);
    } catch {
      throw new OperationFailedError();
    }
  }

  // cp ./files/text.txt c:/temp/ - correct example
  async cp([pathToFile, newPath]) {
    const filePath = resolve(pathToFile);
    const isPathToFile = await isFile(filePath);

    const newDirectoryPath = resolve(newPath);
    const newFilePath = resolve(newDirectoryPath, parse(filePath).base);
    const isDirectoryNewPath = parse(newDirectoryPath).ext.length === 0;

    if (isPathToFile === false || !isDirectoryNewPath) {
      throw new InvalidInputError();
    }

    if (isPathToFile === null) {
      throw new OperationFailedError();
    }

    try {
      const readStream = createReadStream(filePath);
      const writeStream = createWriteStream(newFilePath, { flags: 'wx' });

      await pipeline(readStream, writeStream);
    } catch {
      throw new OperationFailedError();
    }
  }

  async mv([pathToFile, newPath]) {}
}
