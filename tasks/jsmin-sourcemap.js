/*
 * grunt-jsmin-sourcemap
 * https://github.com/twolfson/grunt-jsmin-sourcemap
 *
 * Copyright (c) 2012 Todd Wolfson
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('jsmin-sourcemap', 'Your task description goes here.', function() {
    grunt.log.write(grunt.helper('jsmin-sourcemap'));
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('jsmin-sourcemap', function() {
    return 'jsmin-sourcemap!!!';
  });

};
