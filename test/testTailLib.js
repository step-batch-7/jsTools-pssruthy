'use strict';
const { assert } = require('chai');
const { fake} = require('sinon');
const {
  getExtractedLines,
  executeTailOnFileContent,
  parseTailOptions,
  executeTailOnStandardInput
} = require('../src/tailLib');
const zero = 0, one = 1, two = 2;

describe('tailLib', () => {
  describe('getExtractedLines', () => {
    it('Should extract last 10 lines if has more than 10 lines ', () => {
      const content = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      const lineCount = 10;
      const onComplete = fake();
      getExtractedLines(content, lineCount, onComplete);
      const result = { err: '', content: '2\n3\n4\n5\n6\n7\n8\n9\n10\n11' };
      assert.ok(onComplete.calledWithExactly(result));
    });
    it('Should extract all lines if has less than 10 lines', () => {
      const content = ['8', '9', '10', '11'];
      const lineCount = 10;
      const onComplete = fake();
      getExtractedLines(content, lineCount, onComplete);
      const result = { err: '', content: '8\n9\n10\n11' };
      assert.ok(onComplete.calledWithExactly(result));
    });
    it('Should extract specified lines if has more than line count', () => {
      const content = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      const lineCount = 4;
      const onComplete = fake();
      getExtractedLines(content, lineCount, onComplete);
      const result = { err: '', content: '8\n9\n10\n11' };
      assert.ok(onComplete.calledWithExactly(result));
    });
    it('Should extract specified lines if has less than line count', () => {
      const content = ['8', '9', '10', '11'];
      const lineCount = 6;
      const onComplete = fake();
      getExtractedLines(content, lineCount, onComplete);
      const result = { err: '', content: '8\n9\n10\n11' };
      assert.ok(onComplete.calledWithExactly(result));
    });
    it('Should extract lines when the line number of count is zero', () => {
      const content = ['8', '9', '10', '11'];
      const lineCount = 0;
      const onComplete = fake();
      getExtractedLines(content, lineCount, onComplete);
      const result = { err: '', content: '' };
      assert.ok(onComplete.calledWithExactly(result));
    });
  });

  describe('getFileContents', () => {
    it('Should give the file contents when the file exist', (done) => {
      const readFile = fake();
      const onComplete = (result) => {
        assert.strictEqual(result.content, '7\n8\n9\n10\n11');
        assert.strictEqual(result.err, '');
        done();
      };
      const tailOptions = { lineCount: 5, fileName: ['a.txt'] };
      executeTailOnFileContent(readFile, tailOptions, onComplete);
      assert(readFile.firstCall.args[zero], 'a.txt');
      assert(readFile.firstCall.args[one], 'utf8');
      readFile.firstCall.args[two](null, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n');
    });
    it('Should give error message for not existing file', (done) => {
      const readFile = fake();
      const onComplete = (result) => {
        const {content, err} = result;
        assert.strictEqual(content, '');
        assert.strictEqual(err, 'tail: badFile: No such file or directory');
        done();
      };
      const tailOptions = { lineCount: 5, fileName: ['badFile'] };
      executeTailOnFileContent(readFile, tailOptions, onComplete);
      assert(readFile.firstCall.args[zero], 'badFile');
      assert(readFile.firstCall.args[one], 'utf8');
      readFile.firstCall.args[two]( 'file not fount', null);
    });
  });
  describe('parseTailOptions', () => {
    it('Should give tail options if the line count is not specified', () => {
      const tailOptions = { lineCount: 10, fileName: ['a.txt'] } ;
      const userOptions = ['a.txt'];
      const actual = parseTailOptions(userOptions);
      assert.deepStrictEqual(actual, {tailOptions});
    });
    it('Should give tail options if specified line count is valid', () => {
      const expected = { tailOptions: { lineCount: 3, fileName: ['a.txt'] } };
      const userOptions = ['-n', '3', 'a.txt'];
      const actual = parseTailOptions(userOptions);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give error when the line count is an alphabet', () => {
      const expected = { err: 'tail: illegal offset -- r' };
      const userOptions = ['-n', 'r', 'a.txt'];
      const actual = parseTailOptions(userOptions);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give tail options if specified line count is zero', () => {
      const tailOptions = { lineCount: 0, fileName: ['a.txt'] };
      const userOptions = ['-n', '0', 'a.txt'];
      const actual = parseTailOptions(userOptions);
      assert.deepStrictEqual(actual, {tailOptions});
    });
    it('Should give error when the line count is an fractional number', () => {
      const expected = { err: 'tail: illegal offset -- 3.3' };
      const userOptions = ['-n', '3.3', 'a.txt'];
      const actual = parseTailOptions(userOptions);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give tail options if specified line count is negative', () => {
      const expected = { tailOptions: { lineCount: 3, fileName: ['a.txt'] } };
      const userOptions = ['-n', '-3', 'a.txt'];
      const actual = parseTailOptions(userOptions);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('getStandardInput', () => {
    it('Should give last specified lines for standard input', (done) => {
      const onComplete = (result) => {
        const {content, err} = result;
        assert.strictEqual(content, '2\n3\n4\n5\n6\n7\n8\n9\n10\n11');
        assert.strictEqual(err, '');
        done();
      };
      const stdin = {setEncoding: fake(), on: fake()};
      const lineCount = 10;
      executeTailOnStandardInput(stdin, lineCount, onComplete);
      assert(stdin.setEncoding.calledWith, 'utf8');
      assert.strictEqual(stdin.on.firstCall.args[zero], 'data');
      assert.strictEqual(stdin.on.secondCall.args[zero], 'end');
      assert.strictEqual(stdin.on.callCount, two);
      stdin.on.firstCall.args[one]('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n');
      stdin.on.secondCall.args[one]();
    });
  });
});
