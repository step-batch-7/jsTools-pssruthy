'use strict';
const { readFileSync, existsSync } = require('fs');
const { assert } = require('chai');
const { getFileSystem } = require('./../src/config');

describe('config', () => {
  describe('getFileSystem', () => {
    it('Should give the file system', () => {
      const expected = { readFile: readFileSync, exists: existsSync };
      assert.deepStrictEqual(getFileSystem(), expected);
    });
  });
});
