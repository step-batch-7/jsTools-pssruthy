const { performTail } = require('./src/tailLib');
const { readFileSync, existsSync } = require('fs');
const { stdout, stderr } = process;

const main = function() {
  const fs = { readFile: readFileSync, exists: existsSync };
  const result = performTail(process.argv, fs);
  stderr.write(result.err);
  stdout.write(result.content);
};

main();
