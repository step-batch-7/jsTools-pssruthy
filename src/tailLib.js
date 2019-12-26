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
  const parsedOptions = { lineCount: 10 };
  let userOptions = cmdLineArgs.slice(2);
  const message = { err: '', content: '' };
  if (userOptions[0] == '-n') {
    const lineCount = userOptions[1];
    if (!Number.isInteger(+lineCount)) {
      message.err = `tail: illegal offset -- ${lineCount}`;
      return message;
    }
    parsedOptions.lineCount = Math.abs(+lineCount);
    userOptions = userOptions.slice(2);
  }
  parsedOptions.fileName = userOptions[0];
  message.content = parsedOptions;
  return message;
};

const getTail = function(content, lineCount) {
  const fileContent = content.split('\n');
  fileContent.pop();
  const extractedLines = getExtractedLines(fileContent, lineCount);
  const tail = getFormattedLines(extractedLines);
  return tail;
};

const performTail = function(cmdLineArgs, fs) {
  const parseOptionInfo = parseOption(cmdLineArgs);
  if (parseOptionInfo.err) return parseOptionInfo;
  const readFileInfo = getFileContent(fs, parseOptionInfo.content.fileName);
  if (readFileInfo.err) return readFileInfo;
  const lineCount = parseOptionInfo.content.lineCount;
  const tail = getTail(readFileInfo.content, lineCount);
  return {
    err: '',
    content: tail
  };
};

module.exports = {
  getFormattedLines,
  getExtractedLines,
  getFileContent,
  parseOption,
  performTail,
  getTail
};
