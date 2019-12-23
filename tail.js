const { readFileSync, existsSync } = require('fs');
const { manageUsrArgsAndGiveTail } = require('./src/manageUserArgs');

const main = function() {
  const fs = { readFile: readFileSync, exists: existsSync };
  console.log(manageUsrArgsAndGiveTail(process.argv, fs));
};

main();
