const { performTail } = require('./src/tailLib');
const { readFileSync, existsSync } = require('fs');
const { stdout, stderr } = process;

const main = function() {
  const fs = { readFile: readFileSync, exists: existsSync };
  const result = performTail(process.argv, fs);
  result.err && stderr.write(result.err);
  result.content && stdout.write(result.content);
};

main();
