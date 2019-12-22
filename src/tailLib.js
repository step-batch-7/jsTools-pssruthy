const getFormattedLines = function(lines) {
  return lines.join('\n');
};
const getExtractedLines = function(fileContents) {
  return fileContents.slice(fileContents.length - 10);
};
const getFileContent = function(fs, path) {
  if (!fs.exists(path)) {
    throw new Error(`tail: ${path}: No such file or directory`);
  }
  return fs.readFile(path, 'utf8');
};

module.exports = { getFormattedLines, getExtractedLines, getFileContent };
