'use strict';
const getFormattedLines = function(lines) {
  return lines.join('\n');
};

const getExtractedLines = function(fileContents, lineCount) {
  const extractedLine = fileContents.reverse().slice(0, lineCount);
  return extractedLine.reverse();
};

const getFileContent = function(fs, path) {
  const err = `tail: ${path}: No such file or directory`;
  if (!fs.existsSync(path)) return { err, content: '' };
  return { err: '', content: fs.readFileSync(path, 'utf8') };
};

const parseOption = function(cmdLineArgs) {
  const parsedOptions = { lineCount: 10, fileName: cmdLineArgs[0] };
  if (cmdLineArgs[0] == '-n') {
    const lineCount = cmdLineArgs[1];
    if (!Number.isInteger(+lineCount))
      return { err: `tail: illegal offset -- ${lineCount}`, content: '' };
    parsedOptions.lineCount = Math.abs(+lineCount);
    parsedOptions.fileName = cmdLineArgs[2];
  }
  return { err: '', content: parsedOptions };
};

module.exports = {
  getFormattedLines,
  getExtractedLines,
  getFileContent,
  parseOption
};
