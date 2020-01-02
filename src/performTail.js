'use strict';
const { parseTailOptions,
  executeTailOnFileContent, 
  executeTailOnStandardInput } = require('./tailLib');

const performTail = function(userOptions, inputLoaders, onComplete) {
  const { err, tailOptions } = parseTailOptions(userOptions);
  if (err) {
    return onComplete({ err, content: '' });
  }  
  const {stdin, readFile} = inputLoaders;
  const isFilePresent = tailOptions.fileName.length;
  const executeTail = isFilePresent ?
    () => executeTailOnFileContent(readFile, tailOptions, onComplete) :
    () => executeTailOnStandardInput(stdin, tailOptions.lineCount, onComplete);
  executeTail();
};

module.exports = { performTail };
