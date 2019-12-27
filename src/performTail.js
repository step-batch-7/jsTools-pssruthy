'use strict';
const { getExtractedLines, getFileContent, parseOption } = require('./tailLib');

const performTail = function(cmdLineArgs, fs) {
  const { optionErr, parsedOptions } = parseOption(cmdLineArgs.slice(2));
  if (optionErr) return { err: optionErr, content: '' };
  const { fileErr, fileContent } = getFileContent(fs, parsedOptions.fileName);
  if (fileErr) return { err: fileErr, content: '' };
  const lines = fileContent.split('\n').slice(0, -1);
  const bottomLines = getExtractedLines(lines, parsedOptions.lineCount);
  return { err: '', content: bottomLines };
};

module.exports = { performTail };
