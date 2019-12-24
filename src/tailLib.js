const getFormattedLines = function(lines) {
  return lines.join('\n');
};

const getExtractedLines = function(fileContents, lineCount) {
  const extractedLine = fileContents.reverse().slice(0, lineCount);
  return extractedLine.reverse();
};

const getFileContent = function(fs, path) {
  let message = { err: '', content: '' };
  if (!fs.exists(path)) {
    message.err = `tail: ${path}: No such file or directory`;
    return message;
  }
  message.content = fs.readFile(path, 'utf8');
  return message;
};

const parseOption = function(cmdLineArgs) {
  const parsedOptions = { lineCount: 10 };
  const usrOptions = cmdLineArgs.slice(2);
  if (usrOptions.includes('-n')) {
    const lineCount = usrOptions[usrOptions.indexOf('-n') + 1];
    if (!Number.isInteger(+lineCount)) {
      return { err: `tail: illegal offset -- ${lineCount}` };
    }
    parsedOptions.lineCount = +lineCount;
    parsedOptions.fileName = usrOptions[usrOptions.indexOf('-n') + 2];
    return parsedOptions;
  }
  parsedOptions.fileName = usrOptions[0];
  return parsedOptions;
};

module.exports = {
  getFormattedLines,
  getExtractedLines,
  getFileContent,
  parseOption
};
