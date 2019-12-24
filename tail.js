const { performTail } = require('./src/tailLib');
const { getFileSystem } = require('./src/config');

const main = function() {
  const fs = getFileSystem();
  const result = performTail(process.argv, fs);
  result.err && console.error(result.err);
  result.content && console.log(result.content);
};

main();
