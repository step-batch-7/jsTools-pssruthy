'use strict';

const assert = require('assert');
const {parseTailOptions} = require('../src/parseTailOptions');

describe('parseTailOptions', () => {
  describe('parseTailOptions', () => {
    it('Should give tail options if the line count is not specified', () => {
      const tailOptions = {lineCount: 10, fileName: ['a.txt']};
      const userOptions = ['a.txt'];
      const actual = parseTailOptions(userOptions);
      assert.deepStrictEqual(actual, {tailOptions});
    });
    it('Should give tail options if specified line count is valid', () => {
      const expected = {tailOptions: {lineCount: 3, fileName: ['a.txt']}};
      const userOptions = ['-n', '3', 'a.txt'];
      const actual = parseTailOptions(userOptions);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give error when the line count is an alphabet', () => {
      const expected = {err: 'tail: illegal offset -- r'};
      const userOptions = ['-n', 'r', 'a.txt'];
      const actual = parseTailOptions(userOptions);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give tail options if specified line count is zero', () => {
      const tailOptions = {lineCount: 0, fileName: ['a.txt']};
      const userOptions = ['-n', '0', 'a.txt'];
      const actual = parseTailOptions(userOptions);
      assert.deepStrictEqual(actual, {tailOptions});
    });
    it('Should give error when the line count is an fractional number', () => {
      const expected = {err: 'tail: illegal offset -- 3.3'};
      const userOptions = ['-n', '3.3', 'a.txt'];
      const actual = parseTailOptions(userOptions);
      assert.deepStrictEqual(actual, expected);
    });
    it('Should give tail options if specified line count is negative', () => {
      const expected = {tailOptions: {lineCount: 3, fileName: ['a.txt']}};
      const userOptions = ['-n', '-3', 'a.txt'];
      const actual = parseTailOptions(userOptions);
      assert.deepStrictEqual(actual, expected);
    });
  });
});
