'use strict';
const { getExtractedLines, getFileContent, parseOption } = require('./tailLib');

const getBottomLines = function(fileContent, lineCount) {
  const lines = fileContent.split('\n');
  lines.pop();
  const extractedLines = getExtractedLines(lines, lineCount);
  return extractedLines;
};

const performTail = function(cmdLineArgs, fs) {
  const { optionErr, parsedOptions } = parseOption(cmdLineArgs.slice(2));
  if (optionErr) return { err: optionErr, content: '' };
  const { fileErr, fileContent } = getFileContent(fs, parsedOptions.fileName);
  if (fileErr) return { err: fileErr, content: '' };
  const tail = getBottomLines(fileContent, parsedOptions.lineCount);
  return { err: '', content: tail };
};

module.exports = { performTail };
