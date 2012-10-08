module.exports = function (grunt) {
  grunt.file.mkdir('actual');

  grunt.initConfig({
    'jsmin-sourcemap': {
      single: {
        src: 'test_files/jquery.js',
        dest: 'actual/jquery.min.js',
        destMap: 'actual/jquery.js.map'
      },
      multi: {
        src: ['test_files/jquery.js', 'test_files/underscore.js'],
        dest: 'actual/multi.min.js',
        destMap: 'actual/multi.js.map'
      }
    },
    test: {
      all: '*.test.js'
    }
  });

  grunt.loadTasks('../tasks');
  grunt.registerTask('default', 'jsmin-sourcemap test');
};