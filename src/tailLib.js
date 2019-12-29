'use strict';

const EMPTY_STRING = '';
const zero = 0;

const getExtractedLines = function(fileContents, lineCount, display) {
  const extractedLine = fileContents.reverse().slice(zero, lineCount);
  display({ err: EMPTY_STRING, content: extractedLine.reverse().join('\n') });
};

const getFileContent = function(fs, parsedOptions, display) {
  const { fileName, lineCount } = parsedOptions;
  fs.readFile(fileName[0], 'utf8', (err, content) => {
    if (err) {
      const err = `tail: ${fileName}: No such file or directory`;
      display({ err, content: EMPTY_STRING });
    } else {
      const to = -1;
      const lines = content.split('\n').slice(zero, to);
      getExtractedLines(lines, lineCount, display);
    }
  });
};

const parseOption = function(cmdLineArgs) {
  const parsedOptions = { lineCount: 10, fileName: cmdLineArgs.slice(zero) };
  if (cmdLineArgs[zero] === '-n') {
    let index = 1;
    const lineCount = cmdLineArgs[index];
    if (!Number.isInteger(+lineCount)) {
      return { optionErr: `tail: illegal offset -- ${lineCount}` };
    }
    parsedOptions.lineCount = Math.abs(+lineCount);
    index++;
    parsedOptions.fileName = cmdLineArgs.slice(index);
  }
  return { parsedOptions };
};

module.exports = {
  getExtractedLines,
  getFileContent,
  parseOption
};
