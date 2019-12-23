const { assert } = require('chai');
const {
  getFormattedLines,
  getExtractedLines,
  getFileContent
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
    it('Should extract lines when the line count greater than 10', () => {
      const content = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      const actual = getExtractedLines(content);
      const expected = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      assert.deepStrictEqual(actual, expected);
    });
    it('Should extract lines when the line count less than 10', () => {
      const content = ['8', '9', '10', '11'];
      const actual = getExtractedLines(content);
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
        name: 'content',
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
        name: 'err',
        content: 'tail: badFile: No such file or directory'
      };
      assert.deepStrictEqual(getFileContent({ exists }, 'badFile'), expected);
    });
  });
});
