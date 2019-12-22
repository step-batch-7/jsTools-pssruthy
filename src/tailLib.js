const getFormattedLines = function(lines) {
  return lines.join('\n');
};
const getExtractedLines = function(fileContents) {
  return fileContents.slice(fileContents.length - 10);
};

module.exports = { getFormattedLines, getExtractedLines };
