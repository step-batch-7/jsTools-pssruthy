'use strict';
const { assert } = require('chai');
const { fake} = require('sinon');
const { performTail } = require('./../src/performTail');
describe('performTail', () => {
  describe('performTail', () => {
    it('Should give tail 10 lines for one file without options and file contains more than 10 lines ', (done) => {
      const cmdLineArgs = ['node', 'tail.js', 'a.txt'];
      const readFile = fake();
      const display = result => {
        assert.strictEqual(result.content, '2\n3\n4\n5\n6\n7\n8\n9\n10\n11');
        assert.strictEqual(result.err, '');
        done();
      };
      performTail(cmdLineArgs, {readFile, stdin: ''}, display);
      assert.strictEqual(readFile.firstCall.args[0], 'a.txt');
      assert.strictEqual(readFile.firstCall.args[1], 'utf8');
      readFile.firstCall.args[2](null, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n')
    });
    it('Should give tail lines for one file without options and file contains less than 10 lines ', (done) => {
      const cmdLineArgs = ['node', 'tail.js', 'a.txt'];
      const readFile = fake();
      const display = result => {
        assert.strictEqual(result.content, '9\n10\n11');
        assert.strictEqual(result.err, '');
        done();
      };
      performTail(cmdLineArgs, {readFile, stdin: ''}, display);
      assert.strictEqual(readFile.firstCall.args[0], 'a.txt');
      assert.strictEqual(readFile.firstCall.args[1], 'utf8');
      readFile.firstCall.args[2](null, '9\n10\n11\n');
    });
    it('Should give error message when the file does not exist', (done) => {
      const cmdLineArgs = ['node', 'tail.js', 'badFile'];
      const readFile = fake();
      const display = (result) => {
        assert.strictEqual(result.content, '');
        assert.strictEqual(result.err, 'tail: badFile: No such file or directory');
        done();
      };
      performTail(cmdLineArgs, { readFile, stdin: '' }, display);
      assert.strictEqual(readFile.firstCall.args[0], 'badFile');
      assert.strictEqual(readFile.firstCall.args[1], 'utf8');
      readFile.firstCall.args[2]('file not exist', null);
    });
    it('Should give the extracted lines when the line count is specified and valid', (done) => {
      const cmdLineArgs = ['node', 'tail.js', '-n', '3', 'a.txt'];
      const readFile = fake();
      const display = result => {
        assert.strictEqual(result.content, '9\n10\n11');
        assert.strictEqual(result.err, '');
        done();
      };
      performTail(cmdLineArgs, {readFile, stdin: ''}, display);
      assert.strictEqual(readFile.firstCall.args[0], 'a.txt');
      assert.strictEqual(readFile.firstCall.args[1], 'utf8');
      readFile.firstCall.args[2](null, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n')
    });
    it('Should give error message when the line count is not valid', () => {
      const cmdLineArgs = ['node', 'tail.js', '-n', 'r', 'tail.js'];
      const readFile = fake();
      const display = fake();
      performTail(cmdLineArgs, { readFile }, display);
      const result = { err: 'tail: illegal offset -- r', content: '' };
      assert.ok(display.calledWithExactly(result));
    });
    it('Should give tail for standard input without options', (done) => {
      const stdin = { setEncoding: fake(), on: fake() };
      const display = result => {
        assert.strictEqual(result.content, '2\n3\n4\n5\n6\n7\n8\n9\n10\n11');
        assert.strictEqual(result.err, '');
        done();
      };
      performTail(['node', 'tail.js'], { readFile: '', stdin }, display);
      assert(stdin.setEncoding.calledWith('utf8'));
      assert.strictEqual(stdin.on.firstCall.args[0], 'data');
      assert.strictEqual(stdin.on.secondCall.args[0], 'end');
      assert.strictEqual(stdin.on.callCount, 2);
      stdin.on.firstCall.args[1]('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n');
      stdin.on.secondCall.args[1]();
    });
    it('Should give tail for standard input with the line count is specified', (done) => {
      const display = (result) => {
        assert.strictEqual(result.content, '7\n8\n9\n10\n11');
        assert.strictEqual(result.err, '');
        done();
      };
      const stdin = {setEncoding: fake(), on: fake()};
      performTail(['node', 'tail.js', '-n', '5'], { readFile: '', stdin }, display);
      assert(stdin.on.calledWith, 'utf8');
      assert.strictEqual(stdin.on.firstCall.args[0], 'data');
      assert.strictEqual(stdin.on.secondCall.args[0], 'end');
      assert.strictEqual(stdin.on.callCount, 2);
      stdin.on.firstCall.args[1]('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n');
      stdin.on.secondCall.args[1]();
    });
  });
});
