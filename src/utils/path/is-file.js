import { stat } from 'node:fs/promises';

export const isFile = async (path) => {
  try {
    const stats = await stat(path);

    return stats.isFile();
  } catch {
    return null;
  }
};
