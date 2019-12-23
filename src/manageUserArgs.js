const {
  getFormattedLines,
  getExtractedLines,
  getFileContent
} = require('./tailLib');

const manageUsrArgsAndGiveTail = function(cmdLineArgs, fs) {
  const path = cmdLineArgs[2];
  const fileContent = getFileContent(fs, path).split('\n');
  const splitLines = fileContent.slice(0, fileContent.length - 1);
  const extractedLines = getExtractedLines(splitLines);
  return getFormattedLines(extractedLines);
};

module.exports = { manageUsrArgsAndGiveTail };
