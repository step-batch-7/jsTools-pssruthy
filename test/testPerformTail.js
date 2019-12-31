'use strict';
const { assert } = require('chai');
const { fake} = require('sinon');
const { performTail } = require('./../src/performTail');
const zero = 0, one = 1, two = 2;

describe('performTail', () => {
  describe('performTail', () => {
    it('Should give last 10 lines if file has more than 10 lines ', (done) => {
      const userOptions = ['a.txt'];
      const readFile = fake();
      const onComplete = result => {
        assert.strictEqual(result.content, '2\n3\n4\n5\n6\n7\n8\n9\n10\n11');
        assert.strictEqual(result.err, '');
        done();
      };
      performTail(userOptions, {readFile, stdin: ''}, onComplete);
      assert.strictEqual(readFile.firstCall.args[zero], 'a.txt');
      assert.strictEqual(readFile.firstCall.args[one], 'utf8');
      readFile.firstCall.args[two](null, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n');
    });
    it('Should give last lines for file with less than 10 lines ', (done) => {
      const userOptions = ['a.txt'];
      const readFile = fake();
      const onComplete = result => {
        assert.strictEqual(result.content, '9\n10\n11');
        assert.strictEqual(result.err, '');
        done();
      };
      performTail(userOptions, {readFile, stdin: ''}, onComplete);
      assert.strictEqual(readFile.firstCall.args[zero], 'a.txt');
      assert.strictEqual(readFile.firstCall.args[one], 'utf8');
      readFile.firstCall.args[two](null, '9\n10\n11\n');
    });
    it('Should give error message when the file does not exist', (done) => {
      const userOptions = ['badFile'];
      const readFile = fake();
      const onComplete = (result) => {
        const {content, err} = result;
        assert.strictEqual(content, '');
        assert.strictEqual(err, 'tail: badFile: No such file or directory');
        done();
      };
      performTail(userOptions, { readFile, stdin: '' }, onComplete);
      assert.strictEqual(readFile.firstCall.args[zero], 'badFile');
      assert.strictEqual(readFile.firstCall.args[one], 'utf8');
      readFile.firstCall.args[two]('file not exist', null);
    });
    it('Should give specified lines for valid file and line count', (done) => {
      const userOptions = ['-n', '3', 'a.txt'];
      const readFile = fake();
      const onComplete = result => {
        assert.strictEqual(result.content, '9\n10\n11');
        assert.strictEqual(result.err, '');
        done();
      };
      performTail(userOptions, {readFile, stdin: ''}, onComplete);
      assert.strictEqual(readFile.firstCall.args[zero], 'a.txt');
      assert.strictEqual(readFile.firstCall.args[one], 'utf8');
      readFile.firstCall.args[two](null, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n');
    });
    it('Should give error message when the line count is not valid', () => {
      const userOptions = ['-n', 'r', 'tail.js'];
      const readFile = fake();
      const onComplete = fake();
      performTail(userOptions, { readFile }, onComplete);
      const result = { err: 'tail: illegal offset -- r', content: '' };
      assert.ok(onComplete.calledWithExactly(result));
    });
    it('Should give tail for standard input without options', (done) => {
      const stdin = { setEncoding: fake(), on: fake() };
      const onComplete = result => {
        assert.strictEqual(result.content, '2\n3\n4\n5\n6\n7\n8\n9\n10\n11');
        assert.strictEqual(result.err, '');
        done();
      };
      performTail([], { readFile: '', stdin }, onComplete);
      assert(stdin.setEncoding.calledWith('utf8'));
      assert.strictEqual(stdin.on.firstCall.args[zero], 'data');
      assert.strictEqual(stdin.on.secondCall.args[zero], 'end');
      assert.strictEqual(stdin.on.callCount, two);
      stdin.on.firstCall.args[one]('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n');
      stdin.on.secondCall.args[one]();
    });
    it('Should give specified last lines for standard input', (done) => {
      const onComplete = (result) => {
        assert.strictEqual(result.content, '7\n8\n9\n10\n11');
        assert.strictEqual(result.err, '');
        done();
      };
      const stdin = {setEncoding: fake(), on: fake()};
      const userOptions = ['-n', '5'];
      performTail(userOptions, { readFile: '', stdin }, onComplete);
      assert(stdin.setEncoding.calledWith, 'utf8');
      assert.strictEqual(stdin.on.firstCall.args[zero], 'data');
      assert.strictEqual(stdin.on.secondCall.args[zero], 'end');
      assert.strictEqual(stdin.on.callCount, two);
      stdin.on.firstCall.args[one]('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n');
      stdin.on.secondCall.args[one]();
    });
  });
});
