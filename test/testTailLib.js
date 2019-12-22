const assert = require('assert');
const { getFormattedLines } = require('../src/tailLib');

describe('tailLib', () => {
  describe('getFormattedLines', () => {
    it('Should give formatted lines', () => {
      const lines = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      const actual = getFormattedLines(lines);
      const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
      assert.deepStrictEqual(actual, expected);
    });
  });
});
