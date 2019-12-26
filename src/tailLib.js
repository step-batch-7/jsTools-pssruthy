const getFormattedLines = function(lines) {
  return lines.join('\n');
};

const getExtractedLines = function(fileContents, lineCount) {
  const extractedLine = fileContents.reverse().slice(0, lineCount);
  return extractedLine.reverse();
};

const getFileContent = function(fs, path) {
  let message = { err: '', content: '' };
  if (!fs.exists(path)) {
    message.err = `tail: ${path}: No such file or directory`;
    return message;
  }
  message.content = fs.readFile(path, 'utf8');
  return message;
};

const parseOption = function(cmdLineArgs) {
  const parsedOptions = { lineCount: 10 };
  const userOptions = cmdLineArgs.slice(2);
  const message = { err: '', content: '' };
  if (userOptions.includes('-n')) {
    const lineCount = userOptions[userOptions.indexOf('-n') + 1];
    if (!Number.isInteger(+lineCount)) {
      message.err = `tail: illegal offset -- ${lineCount}`;
      return message;
    }
    parsedOptions.lineCount = Math.abs(+lineCount);
    parsedOptions.fileName = userOptions[userOptions.indexOf('-n') + 2];
    message.content = parsedOptions;
    return message;
  }
  parsedOptions.fileName = userOptions[0];
  message.content = parsedOptions;
  return message;
};

const performTail = function(cmdLineArgs, fs) {
  const optionParseMessage = parseOption(cmdLineArgs);
  if (optionParseMessage.err) return optionParseMessage;
  const message = getFileContent(fs, optionParseMessage.content.fileName);
  if (message.err) return message;
  const fileContent = message.content.split('\n');
  fileContent.pop();
  const extractedLines = getExtractedLines(
    fileContent,
    optionParseMessage.content.lineCount
  );
  message.content = getFormattedLines(extractedLines);
  return message;
};

module.exports = {
  getFormattedLines,
  getExtractedLines,
  getFileContent,
  parseOption,
  performTail
};
