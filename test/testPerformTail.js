'use strict';
const { assert } = require('chai');
const { performTail } = require('./../src/performTail');
describe('performTail', () => {
  describe('performTail', () => {
    it('Should give tail 10 lines for one file without options and file contains more than 10 lines ', () => {
      const cmdLineArgs = ['node', 'tail.js', 'a.txt'];
      const readFileSync = function(path, encoding) {
        assert.strictEqual(path, 'a.txt');
        assert.strictEqual(encoding, 'utf8');
        return '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n';
      };
      const existsSync = path => {
        assert.strictEqual(path, 'a.txt');
        return true;
      };
      const fs = { readFileSync, existsSync };
      const actual = performTail(cmdLineArgs, fs);
      const expected = { err: '', content: '2\n3\n4\n5\n6\n7\n8\n9\n10\n11' };
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give tail lines for one file without options and file contains less than 10 lines ', () => {
      const cmdLineArgs = ['node', 'tail.js', 'a.txt'];
      const readFileSync = function(path, encoding) {
        assert.strictEqual(path, 'a.txt');
        assert.strictEqual(encoding, 'utf8');
        return '9\n10\n11\n';
      };
      const existsSync = path => {
        assert.strictEqual(path, 'a.txt');
        return true;
      };
      const fs = { readFileSync, existsSync };
      const actual = performTail(cmdLineArgs, fs);
      const expected = { err: '', content: '9\n10\n11' };
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give error message when the file does not exist', () => {
      const existsSync = path => false;
      const cmdLineArgs = ['node', 'tail.js', 'badFile'];
      const actual = performTail(cmdLineArgs, { existsSync });
      const expected = {
        err: 'tail: badFile: No such file or directory',
        content: ''
      };
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give the extracted lines when the line count is specified and valid', () => {
      const readFileSync = (path, encoding) =>
        '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n';
      const existsSync = path => true;
      const fs = { readFileSync, existsSync };
      const cmdLineArgs = ['node', 'tail.js', '-n', '3', 'tail.js'];
      const actual = performTail(cmdLineArgs, fs);
      const expected = { err: '', content: '9\n10\n11' };
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give error message when the line count is not valid', () => {
      const cmdLineArgs = ['node', 'tail.js', '-n', 'r', 'tail.js'];
      const actual = performTail(cmdLineArgs, {});
      const expected = { err: 'tail: illegal offset -- r', content: '' };
      assert.deepStrictEqual(actual, expected);
    });
  });
});
