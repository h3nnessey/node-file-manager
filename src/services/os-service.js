import { EOL, cpus, homedir, userInfo, arch } from "node:os";
import {
  InvalidInputError,
  OperationFailedError,
} from "../utils/error/index.js";

export class OsService {
  constructor() {}

  async EOL() {
    console.log(JSON.stringify(EOL));
  }

  async cpus() {
    const cpusInfo = cpus().map((cpu) => ({
      model: cpu.model,
      speed: (cpu.speed / 1000).toFixed(2) + "GHz",
    }));

    console.log(`Overall amount of CPUS: ${cpusInfo.length}`);
    console.table(cpusInfo);
  }

  async homedir() {
    console.log(homedir());
  }

  async username() {
    console.log(userInfo().username);
  }

  async architecture() {
    console.log(arch());
  }

  async exec(cmd) {
    // todo: validate all possible cases later

    if (!cmd.startsWith("--")) {
      throw new InvalidInputError();
    }

    const command = cmd.replaceAll("--", "");

    if (command in this) {
      try {
        await this[command]();
      } catch {
        throw new OperationFailedError();
      }
    } else {
      throw new InvalidInputError();
    }
  }
}
