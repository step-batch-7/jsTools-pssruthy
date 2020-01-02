'use strict';

const EMPTY_STRING = '';
const ZERO = 0;

const getExtractedLines = function(fileContents, lineCount, onComplete) {
  let extractedLine = [];
  if(lineCount !== ZERO){
    extractedLine = fileContents.slice(-lineCount);
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
    onInputLoad(content, lineCount, onComplete);
  });
};

const onInputLoad = function(data, lineCount, onComplete) {
  const lastIndex = -1;
  const lines = data.split('\n').slice(ZERO, lastIndex);
  getExtractedLines(lines, lineCount, onComplete);
};

const executeTailOnStandardInput = function(stdin, lineCount, onComplete) {
  stdin.setEncoding('utf8');
  let content = '';
  stdin.on('data', (data) =>  { 
    content = content + data; 
  } );
  stdin.on('end', () => onInputLoad(content, lineCount, onComplete));
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
  executeTailOnStandardInput
};
