const { readFileSync, existsSync } = require('fs');
const { stdout, stderr } = require('process');
const { sudoMain } = require('./src/manageUserArgs');

const main = function() {
  const fs = { readFile: readFileSync, exists: existsSync };
  const result = sudoMain(process.argv, fs);
  result.err && console.error(result.err);
  result.content && console.log(result.content);
};

main();
