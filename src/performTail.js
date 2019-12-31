'use strict';
const { parseOption, getFileContent, getStandardInput } = require('./tailLib');

const performTail = function(userOptions, inputStreams, onComplete) {
  const { optionErr, parsedOptions } = parseOption(userOptions);
  if (optionErr) {
    return onComplete({ err: optionErr, content: '' });
  }  
  const {stdin, readFile} = inputStreams;
  const isFilePresent = parsedOptions.fileName.length;
  if (isFilePresent) {
    getFileContent(readFile, parsedOptions, onComplete);
  } else {
    getStandardInput(stdin, parsedOptions, onComplete);
  }
};

module.exports = { performTail };
