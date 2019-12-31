'use strict';
const { parseOption, getFileContent, getStandardInput } = require('./tailLib');

const performTail = function(userOptions, inputStreams, onComplete) {
  const { optionErr, parsedOptions } = parseOption(userOptions);
  if (optionErr) {
    return onComplete({ err: optionErr, content: '' });
  }  
  const isFilePresent = parsedOptions.fileName.length;
  if (isFilePresent) {
    getFileContent(inputStreams, parsedOptions, onComplete);
  } else {
    getStandardInput(inputStreams, parsedOptions, onComplete);
  }
};

module.exports = { performTail };
