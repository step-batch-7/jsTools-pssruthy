'use strict';
const {
  getFormattedLines,
  getExtractedLines,
  getFileContent,
  parseOption
} = require('./tailLib');

const getBottomLines = function(fileContent, lineCount) {
  const lines = fileContent.split('\n');
  lines.pop();
  const extractedLines = getExtractedLines(lines, lineCount);
  const tail = getFormattedLines(extractedLines);
  return tail;
};

const performTail = function(cmdLineArgs, fs) {
  const parseOptionInfo = parseOption(cmdLineArgs.slice(2));
  if (parseOptionInfo.err) return parseOptionInfo;
  const readFileInfo = getFileContent(fs, parseOptionInfo.content.fileName);
  if (readFileInfo.err) return readFileInfo;
  const lineCount = parseOptionInfo.content.lineCount;
  const tail = getBottomLines(readFileInfo.content, lineCount);
  return { err: '', content: tail };
};

module.exports = { performTail, getBottomLines };
