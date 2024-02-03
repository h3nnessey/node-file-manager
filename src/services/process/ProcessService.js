export class ProcessService {
  constructor() {}

  cd(path) {
    try {
      // if invalid path - Invalid Input?
      // if Valid path and failed - Operation failed?
      process.chdir(path);
    } catch {}
  }

  up() {}

  chdir() {}
}
