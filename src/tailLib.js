const getFormattedLines = function(lines) {
  return lines.join('\n');
};
const getExtractedLines = function(fileContents) {
  const extractedLine = fileContents.reverse().slice(0, 10);
  return extractedLine.reverse();
};
const getFileContent = function(fs, path) {
  let message = {};
  if (!fs.exists(path)) {
    message = {
      name: 'err',
      content: `tail: ${path}: No such file or directory`
    };
    return message;
  }
  message = { name: 'content', content: fs.readFile(path, 'utf8') };
  return message;
};

const parseOption = function(cmdLineArgs) {
  const parsedOptions = { lineCount: 10 };
  if (cmdLineArgs.includes('-n')) {
    parsedOptions.lineCount = +cmdLineArgs[cmdLineArgs.indexOf('-n') + 1];
    parsedOptions.fileName = cmdLineArgs[cmdLineArgs.indexOf('-n') + 2];
    return parsedOptions;
  }
  parsedOptions.fileName = cmdLineArgs[2];
  return parsedOptions;
};

module.exports = {
  getFormattedLines,
  getExtractedLines,
  getFileContent,
  parseOption
};
