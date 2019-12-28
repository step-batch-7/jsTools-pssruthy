'use strict';
const { assert } = require('chai');
const { fake, stub } = require('sinon');
const {
  getExtractedLines,
  getFileContent,
  parseOption
} = require('../src/tailLib');

describe('tailLib', () => {
  describe('getExtractedLines', () => {
    it('Should extract lines when the line count greater than 10 when line count is not specified', () => {
      const content = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      const actual = getExtractedLines(content, 10);
      const expected = '2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
      assert.deepStrictEqual(actual, expected);
    });
    it('Should extract lines when the line count less than 10 when line count is not specified', () => {
      const content = ['8', '9', '10', '11'];
      const actual = getExtractedLines(content, 10);
      const expected = '8\n9\n10\n11';
      assert.deepStrictEqual(actual, expected);
    });
    it('Should extract lines when the number of lines greater than specified  line count', () => {
      const content = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      const actual = getExtractedLines(content, 4);
      const expected = '8\n9\n10\n11';
      assert.deepStrictEqual(actual, expected);
    });
    it('Should extract lines when the number of lines lesser than specified  line count', () => {
      const content = ['8', '9', '10', '11'];
      const actual = getExtractedLines(content, 6);
      const expected = '8\n9\n10\n11';
      assert.deepStrictEqual(actual, expected);
    });
    it('Should extract lines when the line number of count is zero', () => {
      const content = ['8', '9', '10', '11'];
      const actual = getExtractedLines(content, 0);
      const expected = '';
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('getFileContents', () => {
    it('Should give the file contents when the file exist', () => {
      const readFileSync = stub()
        .withArgs('a.txt', 'utf8')
        .returns('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n');
      const existsSync = stub()
        .withArgs('a.txt')
        .returns(true);
      const expected = { fileContent: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n' };
      const actual = getFileContent({ readFileSync, existsSync }, 'a.txt');
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give error message for not existing file', () => {
      const existsSync = fake.returns(false);
      const expected = { fileErr: 'tail: badFile: No such file or directory' };
      assert.deepStrictEqual(
        getFileContent({ existsSync }, 'badFile'),
        expected
      );
    });
  });
  describe('parseOptions', () => {
    it('Should give parsed options when the count option is not specified', () => {
      const expected = { parsedOptions: { lineCount: 10, fileName: 'a.txt' } };
      const cmdLineArgs = ['a.txt'];
      const actual = parseOption(cmdLineArgs);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give the parsed option when the line count is specified and positive', () => {
      const expected = { parsedOptions: { lineCount: 3, fileName: 'a.txt' } };
      const cmdLineArgs = ['-n', '3', 'a.txt'];
      const actual = parseOption(cmdLineArgs);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give error when the line count is an alphabet', () => {
      const expected = { optionErr: 'tail: illegal offset -- r' };
      const cmdLineArgs = ['-n', 'r', 'a.txt'];
      const actual = parseOption(cmdLineArgs);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give the parsed option when the line count is specified and count is zero', () => {
      const expected = { parsedOptions: { lineCount: 0, fileName: 'a.txt' } };
      const cmdLineArgs = ['-n', '0', 'a.txt'];
      const actual = parseOption(cmdLineArgs);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give error when the line count is an fractional number', () => {
      const expected = { optionErr: 'tail: illegal offset -- 3.3' };
      const cmdLineArgs = ['-n', '3.3', 'a.txt'];
      const actual = parseOption(cmdLineArgs);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give the parsed option when the line count is specified and count is negative', () => {
      const expected = { parsedOptions: { lineCount: 3, fileName: 'a.txt' } };
      const cmdLineArgs = ['-n', '-3', 'a.txt'];
      const actual = parseOption(cmdLineArgs);
      assert.deepStrictEqual(actual, expected);
    });
  });
});
