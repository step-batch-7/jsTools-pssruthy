const { performTail } = require('./src/tailLib');
const { readFileSync, existsSync } = require('fs');

const main = function() {
  const fs = { readFile: readFileSync, exists: existsSync };
  const result = performTail(process.argv, fs);
  result.err && console.error(result.err);
  result.content && console.log(result.content);
};

main();
