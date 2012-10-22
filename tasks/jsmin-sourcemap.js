var jsmin = require('jsmin-sourcemap');
module.exports = function (grunt) {
  grunt.registerMultiTask('jsmin-sourcemap', 'Generate minified JavaScript and sourcemap from files', function () {
    // Grab the files to minify
    var file = this.data,
        srcFile = file.src,
        srcFiles = grunt.file.expand(srcFile);

    // Map each file into a JSMin input
    var input = srcFiles.map(function (file) {
      var code = grunt.task.directive(file, grunt.file.read),
          src = file;
      return {'code': code, 'src': src};
    });

    // Minify the input
    var destFile =  this.file.dest,
        retObj = jsmin({
          'input': input,
          'dest': destFile
        });

    var destMapFile =  this.file.dest + ".map"  
    // Grab the minified code
    var code = retObj.code;

    // Append a sourceMappingURL to the code
    code = code + '\n//@ sourceMappingURL=' +  destMapFile;

    // Write out the code and map
    grunt.file.write(destFile, code);
    grunt.log.writeln("Minified file: " + destFile);
    grunt.file.write(destMapFile, retObj.sourcemap);
    grunt.log.writeln("Minified file map: " + destMapFile);
  });
};