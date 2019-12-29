'use strict';
const { getFileContent, parseOption } = require('./tailLib');

const performTail = function(cmdLineArgs, fs, display) {
  const { optionErr, parsedOptions } = parseOption(cmdLineArgs.slice(2));
  if (optionErr) display({ err: optionErr, content: '' });
  else getFileContent(fs, parsedOptions, display);
};

module.exports = { performTail };
