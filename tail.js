'use strict';
const { performTail } = require('./src/performTail');
const { readFile } = require('fs');
const { stdout, stderr } = process;

const main = function() {
  const display = function(result) {
    stderr.write(result.err);
    stdout.write(result.content);
  };
  const fs = { readFile };
  performTail(process.argv, fs, display);
};

main();
