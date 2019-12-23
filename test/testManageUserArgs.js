const { assert } = require('chai');
const { sudoMain } = require('./../src/manageUserArgs');

describe('manageUserArgs', () => {
  describe('manageUsrArgsAndGiveTail', () => {
    it('Should give tail 10 lines for one file without options and file contains more than 10 lines ', () => {
      const actual = '2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
      const cmdLineArgs = ['node', 'tail.js', 'a.txt'];
      const readFile = function(path, encoding) {
        assert.strictEqual(path, 'a.txt');
        assert.strictEqual(encoding, 'utf8');
        return '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n';
      };
      const exists = path => {
        assert.strictEqual(path, 'a.txt');
        return true;
      };
      const fs = { readFile, exists };
      const expected = sudoMain(cmdLineArgs, fs);
      assert.strictEqual(actual, expected);
    });
    it('Should give tail lines for one file without options and file contains less than 10 lines ', () => {
      const actual = '9\n10\n11';
      const cmdLineArgs = ['node', 'tail.js', 'a.txt'];
      const readFile = function(path, encoding) {
        assert.strictEqual(path, 'a.txt');
        assert.strictEqual(encoding, 'utf8');
        return '9\n10\n11\n';
      };
      const exists = path => {
        assert.strictEqual(path, 'a.txt');
        return true;
      };
      const fs = { readFile, exists };
      const expected = sudoMain(cmdLineArgs, fs);
      assert.strictEqual(actual, expected);
    });
    it('Should give error message when the file does not exist', () => {
      const exists = path => false;
      const cmdLineArgs = ['node', 'tail.js', 'badFile'];
      const actual = sudoMain(cmdLineArgs, { exists });
      const expected = 'tail: badFile: No such file or directory';
      assert.strictEqual(actual, expected);
    });
  });
});
