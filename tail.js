const { readFileSync, existsSync } = require('fs');
const { sudoMain } = require('./src/manageUserArgs');

const main = function() {
  const fs = { readFile: readFileSync, exists: existsSync };
  console.log(sudoMain(process.argv, fs));
};

main();
