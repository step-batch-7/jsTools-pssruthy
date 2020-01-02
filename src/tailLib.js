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
  const [filePath] = fileName;
  readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      const err = `tail: ${fileName}: No such file or directory`;
      return onComplete({ err, content: EMPTY_STRING });
    }
    getExtractedLines(content, lineCount, onComplete);
  });
};

const getSplittedLines = function(data) {
  const content = data.trimEnd();
  const lines = content.split('\n');
  return lines;
};

const executeTailOnStdIn = function(stdin, lineCount, onComplete) {
  stdin.setEncoding('utf8');
  let content = '';
  stdin.on('data', (data) =>  { 
    content = content + data; 
  } );
  stdin.on('end', () => getExtractedLines(content, lineCount, onComplete));
};

const parseTailOptions = function(userOptions) {
  const tailOptions = { lineCount: 10, fileName: [...userOptions] };
  if (userOptions[ZERO] === '-n') {
    let index = 1;
    const lineCount = userOptions[index];
    if (!Number.isInteger(+lineCount)) {
      return { err: `tail: illegal offset -- ${lineCount}` };
    }
    tailOptions.lineCount = Math.abs(+lineCount);
    index++;
    tailOptions.fileName = userOptions.slice(index);
  }
  return { tailOptions };
};

module.exports = {
  getExtractedLines,
  parseTailOptions,
  executeTailOnFileContent, 
  executeTailOnStdIn
};
