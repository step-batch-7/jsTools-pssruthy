'use strict';

const EMPTY_STRING = '';
const ZERO = 0;

const getExtractedLines = function(content, lineCount, onComplete) {
  const lines = getSplittedLines(content);
  let extractedLine = [];
  if(lineCount !== ZERO){
    extractedLine = lines.slice(-lineCount);
  }
  onComplete({ err: EMPTY_STRING, content: extractedLine.join('\n') });
};

const executeTailOnFileContent = function(readFile, tailOptions, onComplete) {
  const { fileName, lineCount } = tailOptions;
  readFile(fileName[ZERO], 'utf8', (err, content) => {
    if (err) {
      const err = `tail: ${fileName}: No such file or directory`;
      return onComplete({ err, content: EMPTY_STRING });
    }
    getExtractedLines(content, lineCount, onComplete);
  });
};

const getSplittedLines = function(data) {
  let content = data;
  if(data.endsWith('\n')){
    const lastIndex = -1;
    content = content.slice(ZERO, lastIndex);
  }
  return content.split('\n');
};

const executeTailOnStdIn = function(stdin, lineCount, onComplete) {
  stdin.setEncoding('utf8');
  let wholeData = '';
  stdin.on('data', (data) =>  { 
    wholeData += data; 
  } );
  stdin.on('end', () => getExtractedLines(wholeData, lineCount, onComplete));
};

module.exports = {
  getExtractedLines,
  executeTailOnFileContent, 
  executeTailOnStdIn
};
