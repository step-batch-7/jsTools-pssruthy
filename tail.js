'use strict';
const { performTail } = require('./src/performTail');
const { readFile } = require('fs');
const { stdout, stderr, stdin } = process;

const main = function() {
  const writeTail = function(result) {
    stderr.write(result.err);
    stdout.write(`${result.content}\n`);
  };
  const inputStreams = { readFile, stdin };
  const from = 2;
  performTail(process.argv.slice(from), inputStreams, writeTail);
};

main();
