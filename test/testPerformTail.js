'use strict';
const { assert } = require('chai');
const { fake, stub } = require('sinon');
const { performTail } = require('./../src/performTail');
describe('performTail', () => {
  describe('performTail', () => {
    const display = stub();
    it('Should give tail 10 lines for one file without options and file contains more than 10 lines ', () => {
      const cmdLineArgs = ['node', 'tail.js', 'a.txt'];
      const readFile = (path, encoding, callBack) => {
        assert.strictEqual(path, 'a.txt');
        assert.strictEqual(encoding, 'utf8');
        callBack(null, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n');
      };
      performTail(cmdLineArgs, { readFile }, display);
      const result = { err: '', content: '2\n3\n4\n5\n6\n7\n8\n9\n10\n11' };
      assert.ok(display.calledWithExactly(result));
    });
    it('Should give tail lines for one file without options and file contains less than 10 lines ', () => {
      const readFile = (path, encoding, callBack) => {
        assert.strictEqual(path, 'a.txt');
        assert.strictEqual(encoding, 'utf8');
        callBack(null, '9\n10\n11\n');
      };
      const cmdLineArgs = ['node', 'tail.js', 'a.txt'];
      const display = fake();
      performTail(cmdLineArgs, { readFile }, display);
      const result = { err: '', content: '9\n10\n11' };
      assert.ok(display.calledWithExactly(result));
    });
    it('Should give error message when the file does not exist', () => {
      const cmdLineArgs = ['node', 'tail.js', 'badFile'];
      const readFile = function(path, encoding, callBack) {
        callBack('file not fount', null);
      };
      performTail(cmdLineArgs, { readFile }, display);
      const result = {
        err: 'tail: badFile: No such file or directory',
        content: ''
      };
      assert.ok(display.calledWith(result));
    });
    it('Should give the extracted lines when the line count is specified and valid', () => {
      const readFile = function(path, content, callBack) {
        callBack('', '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n');
      };
      const cmdLineArgs = ['node', 'tail.js', '-n', '3', 'tail.js'];
      performTail(cmdLineArgs, { readFile }, display);
      const result = { err: '', content: '9\n10\n11' };
      assert.ok(display.calledWith(result));
    });
    it('Should give error message when the line count is not valid', () => {
      const cmdLineArgs = ['node', 'tail.js', '-n', 'r', 'tail.js'];
      const readFile = fake();
      performTail(cmdLineArgs, { readFile }, display);
      const result = { err: 'tail: illegal offset -- r', content: '' };
      assert.ok(display.calledWith(result));
    });
  });
});
