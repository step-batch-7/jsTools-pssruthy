const {
  getFormattedLines,
  getExtractedLines,
  getFileContent
} = require('./tailLib');

const manageUsrArgsAndGiveTail = function(cmdLineArgs, fs) {
  const path = cmdLineArgs[2];
  const fileContent = getFileContent(fs, path).split('\n');
  const extractedLines = getExtractedLines(fileContent);
  return getFormattedLines(extractedLines);
};

module.exports = { manageUsrArgsAndGiveTail };
