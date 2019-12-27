'use strict';
const { performTail } = require('./src/performTail');
const { readFileSync, existsSync } = require('fs');
const { stdout, stderr } = process;

const main = function() {
  const fs = { readFileSync, existsSync };
  const result = performTail(process.argv, fs);
  stderr.write(result.err);
  stdout.write(`${result.content}\n`);
};

main();
