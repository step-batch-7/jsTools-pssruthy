const assert = require('assert');
const { getFormattedLines, getExtractedLines } = require('../src/tailLib');

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
      const content = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      const actual = getExtractedLines(content);
      const expected = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
