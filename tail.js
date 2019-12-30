'use strict';
const { performTail } = require('./src/performTail');
const { readFile } = require('fs');
const { stdout, stderr, stdin } = process;

const main = function() {
  const display = function(result) {
    stderr.write(result.err);
    stdout.write(result.content);
  };
  const inputStream = { readFile, stdin };
  performTail(process.argv, inputStream, display);
};

main();
