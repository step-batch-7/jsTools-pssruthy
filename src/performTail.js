'use strict';
const { parseOption, chooseStream } = require('./tailLib');

const performTail = function(cmdLineArgs, inputStreams, display) {
  const from = 2;
  const { optionErr, parsedOptions } = parseOption(cmdLineArgs.slice(from));
  if (optionErr) {
    display({ err: optionErr, content: '' });
  } else {
    const loadInput = chooseStream(parsedOptions);
    loadInput(inputStreams, parsedOptions, display);
  }
};

module.exports = { performTail };
