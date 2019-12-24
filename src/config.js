'use strict';
const { readFileSync, existsSync } = require('fs');

const getFileSystem = function() {
  return { readFile: readFileSync, exists: existsSync };
};

module.exports = { getFileSystem };
