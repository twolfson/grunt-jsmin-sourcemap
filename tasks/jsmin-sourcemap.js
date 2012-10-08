module.exports = function (grunt) {
  grunt.registerTask('jsmin-sourcemap', 'Generate minified JavaScript and sourcemap from files', function() {
    grunt.log.write(grunt.helper('jsmin-sourcemap'));
  });
};