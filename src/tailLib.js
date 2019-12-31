'use strict';

const EMPTY_STRING = '';
const ZERO = 0;

const getExtractedLines = function(fileContents, lineCount, display) {
  const extractedLine = fileContents.reverse().slice(ZERO, lineCount);
  display({ err: EMPTY_STRING, content: extractedLine.reverse().join('\n') });
};

const getFileContent = function(fs, parsedOptions, display) {
  const { fileName, lineCount } = parsedOptions;
  fs.readFile(fileName[ZERO], 'utf8', (err, content) => {
    if (err) {
      const err = `tail: ${fileName}: No such file or directory`;
      return display({ err, content: EMPTY_STRING });
    }
    onInputLoad(content, lineCount, display);
  });
};

const onInputLoad = function(data, lineCount, display) {
  const to = -1;
  const lines = data.split('\n').slice(ZERO, to);
  getExtractedLines(lines, lineCount, display);
};

const getStandardInput = function(inputStreams, parsedOptions, display) {
  const { stdin } = inputStreams;
  stdin.setEncoding('utf8');
  let content = '';
  stdin.on('data', function(data) {
    content = content + data;
  });
  stdin.on('end', () => onInputLoad(content, parsedOptions.lineCount, display));
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

const chooseInputMethod = function(parsedOptions) {
  if (parsedOptions.fileName.length === ZERO) {
    return getStandardInput;
  }
  return getFileContent;
};

module.exports = {
  getExtractedLines,
  getFileContent,
  parseOption,
  chooseInputMethod
};
