import { EOL, cpus, homedir, userInfo, arch } from 'node:os';
import { InvalidInputError, OperationFailedError } from '../utils/error/index.js';

export class OsService {
  EOL() {
    console.log(JSON.stringify(EOL));
  }

  cpus() {
    const cpusInfo = cpus().map((cpu) => ({
      model: cpu.model,
      speed: (cpu.speed / 1000).toFixed(2) + 'GHz',
    }));

    console.log(`Overall amount of CPUS: ${cpusInfo.length}`);
    console.table(cpusInfo);
  }

  homedir() {
    console.log(homedir());
  }

  username() {
    console.log(userInfo().username);
  }

  architecture() {
    console.log(arch());
  }

  exec([cmd]) {
    if (!cmd.startsWith('--')) {
      throw new InvalidInputError();
    }

    const command = cmd.replace('--', '');

    if (command in this) {
      try {
        this[command]();
      } catch {
        throw new OperationFailedError();
      }
    } else {
      throw new InvalidInputError();
    }
  }
}
