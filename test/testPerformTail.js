'use strict';
const { assert } = require('chai');
const { fake, stub } = require('sinon');
const { performTail } = require('./../src/performTail');
describe('performTail', () => {
  describe('performTail', () => {
    it('Should give tail 10 lines for one file without options and file contains more than 10 lines ', () => {
      const readFileSync = stub();
      const cmdLineArgs = ['node', 'tail.js', 'a.txt'];
      readFileSync
        .withArgs('a.txt', 'utf8')
        .returns('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n');
      const existsSync = stub()
        .withArgs('a.txt')
        .returns(true);
      const fs = { readFileSync, existsSync };
      const actual = performTail(cmdLineArgs, fs);
      const expected = { err: '', content: '2\n3\n4\n5\n6\n7\n8\n9\n10\n11' };
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give tail lines for one file without options and file contains less than 10 lines ', () => {
      const cmdLineArgs = ['node', 'tail.js', 'b.txt'];
      const readFileSync = fake.returns('9\n10\n11\n');
      const existsSync = fake.returns(true);
      const fs = { readFileSync, existsSync };
      const actual = performTail(cmdLineArgs, fs);
      const expected = { err: '', content: '9\n10\n11' };
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give error message when the file does not exist', () => {
      const existsSync = fake.returns(false);
      const cmdLineArgs = ['node', 'tail.js', 'badFile'];
      const actual = performTail(cmdLineArgs, { existsSync });
      const expected = {
        err: 'tail: badFile: No such file or directory',
        content: ''
      };
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give the extracted lines when the line count is specified and valid', () => {
      const readFileSync = fake.returns('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n');
      const existsSync = fake.returns(true);
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
