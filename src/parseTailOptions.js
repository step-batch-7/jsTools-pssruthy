'use strict';
const ZERO = 0;

const parseTailOptions = function(userOptions) {
  const tailOptions = {lineCount: 10, fileName: [...userOptions]};
  if (userOptions[ZERO] === '-n') {
    let index = 1;
    const lineCount = userOptions[index];
    if (!Number.isInteger(+lineCount)) {
      return {err: `tail: illegal offset -- ${lineCount}`};
    }
    tailOptions.lineCount = Math.abs(+lineCount);
    tailOptions.fileName = userOptions.slice(++index);
  }
  return {tailOptions};
};

module.exports = {parseTailOptions};
