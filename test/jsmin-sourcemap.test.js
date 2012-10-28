var grunt = require('grunt'),
    assert = require('assert');

var commands = {
  'A single file': function () {
    // Generate paths for expected/actual files
    var retObj = {
          'expected': 'exepceted/jquery.min.js',
          'actual': 'actual/jquery.min.js',
          'actualMap': 'actual/jquery.js.map'
        };
    return retObj;
  },
  'processed via JSMin': function (topic) {
    return topic;
  },
  'outputs properly minified code': function (topic) {
    var expectedFile = grunt.file.read(topic.expected),
        actualFile = grunt.file.read(topic.actual);
    assert.strictEqual(expectedFile, actualFile, ' properly minifies files');
  },
  'properly points to the map file': function (topic) {
    // This is handled by the outputs properly minified code portion
    return true;
  },
  'as well as a sourcemap': function (topic) {
    var actualFileMap = grunt.file.read(topic.actualMap);
    assert.ok(actualFileMap, ' generates a source map for files');
  }
};

// var commands =
// function Suite() {

// }
// Suite

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
    test.expect(6);

    suite.addBatch({
      // jquery.js
      'A single file': {
        // grunt jsmin-sourcemap:single
        'processed via JSMin': {
          'outputs proper minified code': true,
          'which points to the map file': true,
          'as well as a sourcemap': true
        }
      }
    });

      var expectedSingle = grunt.file.read('expected/jquery.min.js'),
          actualSingle = grunt.file.read('actual/jquery.min.js'),
          actualSingleMap = grunt.file.read('actual/jquery.js.map'),
          singleMapRegExp = /\/\/\s*@\s*sourceMappingURL\s*=\s*actual\/jquery.js.map/,
          singleMapDeclarativeExists = singleMapRegExp.test(actualSingle);
        // outputs proper minified code
        test.strictEqual(actualSingle, expectedSingle, ' properly minifies a single file');
        // which points to the map file
        test.ok(singleMapDeclarativeExists, ' points to the proper map location for the single file');
        // as well as a sourcemap
        test.ok(actualSingleMap, ' generates a source map for a single file');

    // Multiple files (jquery.js + underscore.js)
      // processed via JSMin (grunt jsmin-sourcemap:multi)
      var expectedMulti = grunt.file.read('expected/multi.min.js'),
          actualMulti = grunt.file.read('actual/multi.min.js'),
          actualMultiMap = grunt.file.read('actual/multi.js.map'),
          multiMapRegExp = /\/\/\s*@\s*sourceMappingURL\s*=\s*actual\/multi.js.map/,
          multiMapDeclarativeExists = multiMapRegExp.test(actualMulti);
        // outputs proper minified code
        test.strictEqual(actualMulti, expectedMulti, ' properly minifies multiple files');
        // which points to the map file
        test.ok(multiMapDeclarativeExists, ' points to the proper map location for the multiple files');
        // as well as a sourcemap
        test.ok(actualMultiMap, ' generates a source map for multiple files');

    test.done();
  }
};
