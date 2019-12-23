const {
  getFormattedLines,
  getExtractedLines,
  getFileContent
} = require('./tailLib');

const manageUsrArgsAndGiveTail = function(cmdLineArgs, fs) {
  const path = cmdLineArgs[2];
  const message = getFileContent(fs, path);
  if (message.name == 'err') {
    return message.content;
  }
  const contents = message.content.split('\n');
  const splitLines = contents.slice(0, contents.length - 1);
  const extractedLines = getExtractedLines(splitLines);
  return getFormattedLines(extractedLines);
};

module.exports = { manageUsrArgsAndGiveTail };
