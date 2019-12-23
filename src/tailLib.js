const getFormattedLines = function(lines) {
  return lines.join('\n');
};
const getExtractedLines = function(fileContents) {
  return fileContents.slice(fileContents.length - 10);
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

module.exports = { getFormattedLines, getExtractedLines, getFileContent };
