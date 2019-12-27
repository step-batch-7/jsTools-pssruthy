'use strict';

const getExtractedLines = function(fileContents, lineCount) {
  const extractedLine = fileContents.reverse().slice(0, lineCount);
  return extractedLine.reverse().join('\n');
};

const getFileContent = function(fs, path) {
  const fileErr = `tail: ${path}: No such file or directory`;
  if (!fs.existsSync(path)) return { fileErr, fileContent: '' };
  return { fileErr: '', fileContent: fs.readFileSync(path, 'utf8') };
};

const parseOption = function(cmdLineArgs) {
  const parsedOptions = { lineCount: 10, fileName: cmdLineArgs[0] };
  if (cmdLineArgs[0] == '-n') {
    const lineCount = cmdLineArgs[1];
    if (!Number.isInteger(+lineCount))
      return {
        optionErr: `tail: illegal offset -- ${lineCount}`,
        parsedOptions: ''
      };
    parsedOptions.lineCount = Math.abs(+lineCount);
    parsedOptions.fileName = cmdLineArgs[2];
  }
  return { optionErr: '', parsedOptions };
};

module.exports = {
  getExtractedLines,
  getFileContent,
  parseOption
};
