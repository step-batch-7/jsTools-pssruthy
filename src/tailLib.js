'use strict';
const getFormattedLines = function(lines) {
  return lines.join('\n');
};

const getExtractedLines = function(fileContents, lineCount) {
  const extractedLine = fileContents.reverse().slice(0, lineCount);
  return extractedLine.reverse();
};

const getFileContent = function(fs, path) {
  const message = { err: '', content: '' };
  if (!fs.existsSync(path)) {
    message.err = `tail: ${path}: No such file or directory`;
    return message;
  }
  message.content = fs.readFileSync(path, 'utf8');
  return message;
};

const parseOption = function(cmdLineArgs) {
  const parsedOptions = { lineCount: 10, fileName: cmdLineArgs[0] };
  if (cmdLineArgs[0] == '-n') {
    const lineCount = cmdLineArgs[1];
    if (!Number.isInteger(+lineCount))
      return { err: `tail: illegal offset -- ${lineCount}`, content: '' };
    parsedOptions.lineCount = Math.abs(+lineCount);
    parsedOptions.fileName = cmdLineArgs[2];
  }
  return { err: '', content: parsedOptions };
};

module.exports = {
  getFormattedLines,
  getExtractedLines,
  getFileContent,
  parseOption
};
