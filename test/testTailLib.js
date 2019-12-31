'use strict';
const { assert } = require('chai');
const { stub, fake} = require('sinon');
const {
  getExtractedLines,
  getFileContent,
  parseOption
} = require('../src/tailLib');
const zero = 0, one = 1, two = 2;

describe('tailLib', () => {
  describe('getExtractedLines', () => {
    const display = stub();
    it('Should extract last 10 lines if has more than 10 lines ', () => {
      const content = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      const lineCount = 10;
      getExtractedLines(content, lineCount, display);
      const result = { err: '', content: '2\n3\n4\n5\n6\n7\n8\n9\n10\n11' };
      assert.ok(display.calledWith(result));
    });
    it('Should extract all lines if has less than 10 lines', () => {
      const content = ['8', '9', '10', '11'];
      const lineCount = 10;
      getExtractedLines(content, lineCount, display);
      const result = { err: '', content: '8\n9\n10\n11' };
      assert.ok(display.calledWith(result));
    });
    it('Should extract specified lines if has more than line count', () => {
      const content = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      const lineCount = 4;
      getExtractedLines(content, lineCount, display);
      const result = { err: '', content: '8\n9\n10\n11' };
      assert.ok(display.calledWith(result));
    });
    it('Should extract specified lines if has less than line count', () => {
      const content = ['8', '9', '10', '11'];
      const lineCount = 6;
      getExtractedLines(content, lineCount, display);
      const result = { err: '', content: '8\n9\n10\n11' };
      assert.ok(display.calledWith(result));
    });
    it('Should extract lines when the line number of count is zero', () => {
      const content = ['8', '9', '10', '11'];
      const lineCount = 0;
      getExtractedLines(content, lineCount, display);
      const result = { err: '', content: '' };
      assert.ok(display.calledWith(result));
    });
  });

  describe('getFileContents', () => {
    it('Should give the file contents when the file exist', (done) => {
      const readFile = fake();
      const display = (result) => {
        assert.strictEqual(result.content, '7\n8\n9\n10\n11');
        assert.strictEqual(result.err, '');
        done();
      };
      const parsedOptions = { lineCount: 5, fileName: ['a.txt'] };
      getFileContent({readFile, stdin: ''}, parsedOptions, display);
      assert(readFile.firstCall.args[zero], 'a.txt');
      assert(readFile.firstCall.args[one], 'utf8');
      readFile.firstCall.args[two](null, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n');
    });
    it('Should give error message for not existing file', (done) => {
      const readFile = fake();
      const display = (result) => {
        const {content, err} = result;
        assert.strictEqual(content, '');
        assert.strictEqual(err, 'tail: badFile: No such file or directory');
        done();
      };
      const parsedOptions = { lineCount: 5, fileName: ['badFile'] };
      getFileContent({readFile, stdin: ''}, parsedOptions, display);
      assert(readFile.firstCall.args[zero], 'badFile');
      assert(readFile.firstCall.args[one], 'utf8');
      readFile.firstCall.args[two]( 'file not fount', null);
    });
  });
  describe('parseOptions', () => {
    it('Should give parsed options if the line count is not specified', () => {
      const expected = {
        parsedOptions: { lineCount: 10, fileName: ['a.txt'] }
      };
      const userOptions = ['a.txt'];
      const actual = parseOption(userOptions);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give parsed options if specified line count is valid', () => {
      const expected = { parsedOptions: { lineCount: 3, fileName: ['a.txt'] } };
      const userOptions = ['-n', '3', 'a.txt'];
      const actual = parseOption(userOptions);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give error when the line count is an alphabet', () => {
      const expected = { optionErr: 'tail: illegal offset -- r' };
      const userOptions = ['-n', 'r', 'a.txt'];
      const actual = parseOption(userOptions);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give parsed options if specified line count is zero', () => {
      const parsedOptions = { lineCount: 0, fileName: ['a.txt'] };
      const userOptions = ['-n', '0', 'a.txt'];
      const actual = parseOption(userOptions);
      assert.deepStrictEqual(actual, {parsedOptions});
    });
    it('Should give error when the line count is an fractional number', () => {
      const expected = { optionErr: 'tail: illegal offset -- 3.3' };
      const userOptions = ['-n', '3.3', 'a.txt'];
      const actual = parseOption(userOptions);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give parsed option if specified line count is negative', () => {
      const expected = { parsedOptions: { lineCount: 3, fileName: ['a.txt'] } };
      const userOptions = ['-n', '-3', 'a.txt'];
      const actual = parseOption(userOptions);
      assert.deepStrictEqual(actual, expected);
    });
  });
});
