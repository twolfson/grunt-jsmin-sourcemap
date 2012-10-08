var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['jsmin-sourcemap'] = {
  setUp: function (done) {
    // setup here
    done();
  },
  'jsmin-sourcemap': function (test) {
    test.expect(4);

    // A single file (jquery.js)
      // processed via JSMin (grunt jsmin-sourcemap:single)
      var actualSingle = grunt.file.read('actual/jquery.min.js'),
          expectedSingle = grunt.file.read('actual/jquery.min.js'),
          expectedSingleMap = grunt.file.read('actual/jquery.js.map');
        // outputs proper minified code
        test.strictEqual(actualSingle, expectedSingle, ' properly minifies a single file');
        // as well as a sourcemap
        test.ok(expectedSingleMap, ' generates a source map for a single file');

    // Multiple files (jquery.js + underscore.js)
      // processed via JSMin (grunt jsmin-sourcemap:multi)
      var actualMulti = grunt.file.read('actual/multi.min.js'),
          expectedMulti = grunt.file.read('actual/multi.min.js'),
          expectedMultiMap = grunt.file.read('actual/multi.js.map');
        // outputs proper minified code
        test.strictEqual(actualMulti, expectedMulti, ' properly minifies multiple files');
        // as well as a sourcemap
        test.ok(expectedMultiMap, ' generates a source map for multiple files');

    test.done();
  }
};
