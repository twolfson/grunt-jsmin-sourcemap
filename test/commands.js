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
module.exports = commands;