'use strict';
const { performTail } = require('./src/performTail');
const { readFile } = require('fs');
const { stdout, stderr, stdin } = process;

const write = function({err, content}) {
  stderr.write(err);
  stdout.write(`${content}\n`);
};

const main = function() { 
  const inputLoaders = { readFile, stdin };
  const [,, ...commandLineArgs] = process.argv;
  performTail(commandLineArgs, inputLoaders, write);
};

main();
