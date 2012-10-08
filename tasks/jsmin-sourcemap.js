var jsmin = require('jsmin-sourcemap');
module.exports = function (grunt) {
  grunt.registerMultiTask('jsmin-sourcemap', 'Generate minified JavaScript and sourcemap from files', function () {
    // Grab the files to minify
    var file = this.data,
        srcFile = file.src,
        srcFiles = grunt.file.expand(srcFile);

    // Map each file into a JSMin input
    var input = srcFiles.map(function (file) {
      var code = grunt.file.read(file),
          src = file;
      return {'code': code, 'src': src};
    });

    // Minify the input
    var destFile = file.dest,
        retObj = jsmin({
          'input': input,
          'dest': destFile
        });

    // Grab the minified code
    var code = retObj.code;

    // Append a sourceMappingURL to the code
    code = code + '\n//@ sourceMappingURL=' + destFile;

    // Write out the code and map
    grunt.file.write(destFile, code);
    grunt.file.write(file.destMap, retObj.sourcemap);
  });
};