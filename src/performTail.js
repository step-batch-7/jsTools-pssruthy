'use strict';
const { parseOption, chooseInputStream } = require('./tailLib');

const performTail = function(cmdLineArgs, inputStreams, display) {
  const from = 2;
  const { optionErr, parsedOptions } = parseOption(cmdLineArgs.slice(from));
  if (optionErr) {
    return display({ err: optionErr, content: '' });
  }
  const loadInput = chooseInputStream(parsedOptions);
  loadInput(inputStreams, parsedOptions, display);
};

module.exports = { performTail };
