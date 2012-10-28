var grunt = require('grunt'),
    assert = require('assert');

var commands = {};
function Suite() {
  this.batches = [];
}

// Helper function to add new commands
function addCommand(name, fn) {
  commands[name] = fn;
}
function addCommandBatch(cmdObj) {
  // Grab the keys of each of the items from the command object
  var cmdNames = Object.getOwnPropertyNames(cmdObj);

  // Add each of the items
  cmdNames.forEach(function (name) {
    addCommand(name, cmdObj[name]);
  });
}
Suite.addCommand = addCommand;
Suite.addCommandBatch = addCommandBatch;


Suite.prototype = {
  'addBatch': function (batch) {
    // Add the batch to our list of batches
    this.batches.push(batch);
  },
  'export': function () {
    // Export the functions into a vows-like format

  },
  'run': function () {
    // Convert the item into a runnable format
  }
};

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
