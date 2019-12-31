'use strict';
const { parseOption, getFileContent, getStandardInput } = require('./tailLib');

const performTail = function(userOptions, inputStreams, onComplete) {
  const { optionErr, tailOptions } = parseOption(userOptions);
  if (optionErr) {
    return onComplete({ err: optionErr, content: '' });
  }  
  const {stdin, readFile} = inputStreams;
  const isFilePresent = tailOptions.fileName.length;
  const readInput = isFilePresent ?
    () =>   getFileContent(readFile, tailOptions, onComplete) :
    () => getStandardInput(stdin, tailOptions.lineCount, onComplete);
  readInput();
};

module.exports = { performTail };
