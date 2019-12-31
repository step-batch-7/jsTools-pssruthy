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

const getFileContent = function(fs, parsedOptions, onComplete) {
  const { fileName, lineCount } = parsedOptions;
  fs.readFile(fileName[ZERO], 'utf8', (err, content) => {
    if (err) {
      const err = `tail: ${fileName}: No such file or directory`;
      return onComplete({ err, content: EMPTY_STRING });
    }
    onInputLoad(content, lineCount, onComplete);
  });
};

const onInputLoad = function(data, lineCount, onComplete) {
  const to = -1;
  const lines = data.split('\n').slice(ZERO, to);
  getExtractedLines(lines, lineCount, onComplete);
};

const getStandardInput = function(inputStreams, parsedOptions, onComplete) {
  const { stdin } = inputStreams;
  stdin.setEncoding('utf8');
  let content = '';
  stdin.on('data', function(data) {
    content = content + data;
  });
  const lineCount = parsedOptions.lineCount;
  stdin.on('end', () => onInputLoad(content, lineCount, onComplete));
};

const parseOption = function(userOptions) {
  const parsedOptions = { lineCount: 10, fileName: [...userOptions] };
  if (userOptions[ZERO] === '-n') {
    let index = 1;
    const lineCount = userOptions[index];
    if (!Number.isInteger(+lineCount)) {
      return { optionErr: `tail: illegal offset -- ${lineCount}` };
    }
    parsedOptions.lineCount = Math.abs(+lineCount);
    index++;
    parsedOptions.fileName = userOptions.slice(index);
  }
  return { parsedOptions };
};

module.exports = {
  getExtractedLines,
  parseOption, getFileContent, getStandardInput
};
