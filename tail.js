'use strict';
const { performTail } = require('./src/performTail');
const { readFile } = require('fs');
const { stdout, stderr, stdin } = process;

const writeTail = function(result) {
  stderr.write(result.err);
  stdout.write(`${result.content}\n`);
};

const main = function() { 
  const inputStreams = { readFile, stdin };
  const [,, ...commandLineArgs] = process.argv;
  performTail(commandLineArgs, inputStreams, writeTail);
};

main();
