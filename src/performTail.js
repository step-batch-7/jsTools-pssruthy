'use strict';
const { getFileContent, parseOption } = require('./tailLib');

const performTail = function(cmdLineArgs, fs, display) {
  const from = 2;
  const { optionErr, parsedOptions } = parseOption(cmdLineArgs.slice(from));
  if (optionErr) {
    display({ err: optionErr, content: '' });
  } else {
    getFileContent(fs, parsedOptions, display);
  }
};

module.exports = { performTail };
