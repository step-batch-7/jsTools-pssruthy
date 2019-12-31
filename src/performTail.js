'use strict';
const { parseOption, chooseInputMethod } = require('./tailLib');

const performTail = function(userOptions, inputStreams, onComplete) {
  const { optionErr, parsedOptions } = parseOption(userOptions);
  if (optionErr) {
    return onComplete({ err: optionErr, content: '' });
  }
  const inputMethod = chooseInputMethod(parsedOptions);
  inputMethod(inputStreams, parsedOptions, onComplete);
};

module.exports = { performTail };
