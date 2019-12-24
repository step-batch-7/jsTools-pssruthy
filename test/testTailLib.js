const { assert } = require('chai');
const {
  getFormattedLines,
  getExtractedLines,
  getFileContent,
  parseOption
} = require('../src/tailLib');

describe('tailLib', () => {
  describe('getFormattedLines', () => {
    it('Should give formatted lines', () => {
      const lines = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      const actual = getFormattedLines(lines);
      const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('getExtractedLines', () => {
    it('Should extract lines when the line count greater than 10 when line count is not specified', () => {
      const content = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      const actual = getExtractedLines(content, 10);
      const expected = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Should extract lines when the line count less than 10 when line count is not specified', () => {
      const content = ['8', '9', '10', '11'];
      const actual = getExtractedLines(content, 10);
      const expected = ['8', '9', '10', '11'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Should extract lines when the number of lines greater than specified  line count', () => {
      const content = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      const actual = getExtractedLines(content, 4);
      const expected = ['8', '9', '10', '11'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Should extract lines when the number of lines lesser than specified  line count', () => {
      const content = ['8', '9', '10', '11'];
      const actual = getExtractedLines(content, 6);
      const expected = ['8', '9', '10', '11'];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('getFileContents', () => {
    it('Should give the file contents when the file exist', () => {
      const readFile = function(path, encoding) {
        assert.strictEqual(path, 'a.txt');
        assert.strictEqual(encoding, 'utf8');
        return '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n';
      };
      const exists = path => {
        assert.strictEqual(path, 'a.txt');
        return true;
      };
      const expected = {
        err: '',
        content: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n'
      };
      const actual = getFileContent({ readFile, exists }, 'a.txt');
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give error message for not existing file', () => {
      const exists = path => {
        return false;
      };
      const expected = {
        err: 'tail: badFile: No such file or directory',
        content: ''
      };
      assert.deepStrictEqual(getFileContent({ exists }, 'badFile'), expected);
    });
  });
  describe('parseOptions', () => {
    it('Should give parsed options when the count option is not specified', () => {
      const expected = { lineCount: 10, fileName: 'a.txt' };
      const cmdLineArgs = ['node', 'tail.js', 'a.txt'];
      const actual = parseOption(cmdLineArgs);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give the parsed option when the line count is specified', () => {
      const expected = { lineCount: 3, fileName: 'a.txt' };
      const cmdLineArgs = ['node', 'tail.js', '-n', '3', 'a.txt'];
      const actual = parseOption(cmdLineArgs);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give error when the line count is not a valid number', () => {
      const expected = { err: 'tail: illegal offset -- r' };
      const cmdLineArgs = ['node', 'tail.js', '-n', 'r', 'a.txt'];
      const actual = parseOption(cmdLineArgs);
      assert.deepStrictEqual(actual, expected);
    });
  });
});
