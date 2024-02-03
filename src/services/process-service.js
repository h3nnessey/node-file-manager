import { resolve } from "node:path";
import {
  InvalidInputError,
  OperationFailedError,
} from "../utils/error/index.js";

export class ProcessService {
  constructor() {}

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
    process.chdir("..");
  }
}
