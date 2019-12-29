'use strict';

const getExtractedLines = function(fileContents, lineCount, display) {
  const extractedLine = fileContents.reverse().slice(0, lineCount);
  display({ err: '', content: extractedLine.reverse().join('\n') });
};

const getFileContent = function(fs, parsedOptions, display) {
  const { fileName, lineCount } = parsedOptions;
  fs.readFile(fileName, 'utf8', (err, content) => {
    if (err) {
      {
        const err = `tail: ${fileName}: No such file or directory`;
        display({ err, content: '' });
      }
    } else {
      const lines = content.split('\n').slice(0, -1);
      getExtractedLines(lines, lineCount, display);
    }
  });
};

const parseOption = function(cmdLineArgs) {
  const parsedOptions = { lineCount: 10, fileName: cmdLineArgs[0] };
  if (cmdLineArgs[0] == '-n') {
    const lineCount = cmdLineArgs[1];
    if (!Number.isInteger(+lineCount)) {
      return { optionErr: `tail: illegal offset -- ${lineCount}` };
    }
    parsedOptions.lineCount = Math.abs(+lineCount);
    parsedOptions.fileName = cmdLineArgs[2];
  }
  return { parsedOptions };
};

module.exports = {
  getExtractedLines,
  getFileContent,
  parseOption
};
