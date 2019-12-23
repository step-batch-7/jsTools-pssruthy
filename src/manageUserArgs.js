const {
  getFormattedLines,
  getExtractedLines,
  getFileContent,
  parseOption
} = require('./tailLib');

const sudoMain = function(cmdLineArgs, fs) {
  const parsedOptions = parseOption(cmdLineArgs);
  const message = getFileContent(fs, parsedOptions.fileName);
  if (message.name == 'err') {
    return message.content;
  }
  const contents = message.content.split('\n');
  const lines = contents.slice(0, contents.length - 1);
  const extractedLines = getExtractedLines(lines, parsedOptions.lineCount);
  return getFormattedLines(extractedLines);
};

module.exports = { sudoMain };
