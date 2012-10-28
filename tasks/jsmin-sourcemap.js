var jsmin = require('jsmin-sourcemap'),
    path = require('path');
module.exports = function (grunt) {
  grunt.registerMultiTask('jsmin-sourcemap', 'Generate minified JavaScript and sourcemap from files', function () {
    // Grab the files to minify
    var file = this.file,
        data = this.data,
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

    // Append a sourceMappingURL to the code (trim off the first ../ since URL's don't need that)
    var destMap = data.destMap || destFile + ".map",
        relMapPath = path.relative(destFile, destMap);
    relMapPath = relMapPath.replace('../', '');
    code = code + '\n//@ sourceMappingURL=' + relMapPath;

    // Write out the code and map
    grunt.file.write(destFile, code);
    grunt.file.write(destMap, retObj.sourcemap);
  });
};