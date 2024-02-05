const COLORS = new Map([
  ['red', '31'],
  ['green', '32'],
  ['yellow', '33'],
  ['magenta', '35'],
  ['cyan', '36'],
]);

export const colorize = (string, color) => {
  const colorCode = COLORS.get(color);

  if (!colorCode) {
    return string;
  }

  return `\x1b[${colorCode}m${string}\x1b[0m`;
};
