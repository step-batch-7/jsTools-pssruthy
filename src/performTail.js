'use strict';
const { parseOption, chooseInputMethod } = require('./tailLib');

const performTail = function(userOptions, inputStreams, display) {
  const { optionErr, parsedOptions } = parseOption(userOptions);
  if (optionErr) {
    return display({ err: optionErr, content: '' });
  }
  const loadInput = chooseInputMethod(parsedOptions);
  loadInput(inputStreams, parsedOptions, display);
};

module.exports = { performTail };
