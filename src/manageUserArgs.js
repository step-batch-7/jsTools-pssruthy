const {
  getFormattedLines,
  getExtractedLines,
  getFileContent,
  parseOption
} = require('./tailLib');

const sudoMain = function(cmdLineArgs, fs) {
  const parsedOptions = parseOption(cmdLineArgs);
  if (parsedOptions.err) {
    return parsedOptions;
  }
  const message = getFileContent(fs, parsedOptions.fileName);
  if (message.err != '') {
    return message;
  }
  const contents = message.content.split('\n');
  const lines = contents.slice(0, contents.length - 1);
  const extractedLines = getExtractedLines(lines, parsedOptions.lineCount);
  message.content = getFormattedLines(extractedLines);
  return message;
};

module.exports = { sudoMain };
