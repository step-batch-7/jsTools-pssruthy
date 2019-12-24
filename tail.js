const { readFileSync, existsSync } = require('fs');
const { sudoMain } = require('./src/manageUserArgs');
const { getFileSystem } = require('./src/config');

const main = function() {
  const fs = getFileSystem();
  const result = sudoMain(process.argv, fs);
  result.err && console.error(result.err);
  result.content && console.log(result.content);
};

main();
