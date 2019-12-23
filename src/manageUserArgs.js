const {
  getFormattedLines,
  getExtractedLines,
  getFileContent
} = require('./tailLib');

const sudoMain = function(cmdLineArgs, fs) {
  const path = cmdLineArgs[2];
  const message = getFileContent(fs, path);
  if (message.name == 'err') {
    return message.content;
  }
  const contents = message.content.split('\n');
  const lines = contents.slice(0, contents.length - 1);
  const extractedLines = getExtractedLines(lines);
  return getFormattedLines(extractedLines);
};

module.exports = { sudoMain };
