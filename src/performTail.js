'use strict';
const {parseTailOptions} = require('./parseTailOptions');
const {
  executeTailOnFileContent, 
  executeTailOnStdIn} = require('./tailLib');

const performTail = function(userOptions, inputLoaders, onComplete) {
  const {err, tailOptions} = parseTailOptions(userOptions);
  if (err) {
    return onComplete({err, content: ''});
  }  
  const {stdin, readFile} = inputLoaders;
  const isFilePresent = tailOptions.fileName.length;
  const executeTail = isFilePresent ?
    () => executeTailOnFileContent(readFile, tailOptions, onComplete) :
    () => executeTailOnStdIn(stdin, tailOptions.lineCount, onComplete);
  executeTail();
};

module.exports = {performTail};
