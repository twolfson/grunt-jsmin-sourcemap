var jsmin = require('jsmin-sourcemap'),
    path = require('path');
module.exports = function (grunt) {
  grunt.registerMultiTask('jsmin-sourcemap', 'Generate minified JavaScript and sourcemap from files', function () {
    // Grab the files to minify
    var file = this.file,
        data = this.data,
        cwd = data.cwd || '.',
        srcFile = file.src,
        srcFiles = grunt.file.expand({'cwd': cwd}, srcFile);

    // Map each file into a JSMin input
    var input = srcFiles.map(function (file) {
      var filepath = path.join(cwd, file),
          code = grunt.file.read(filepath),
          src = file;
      return {'code': code, 'src': src};
    });

    // Grab the destFile and destMap paths, if it does not exist fallback to destFile + '.map'
    var destFile = path.join(cwd, file.dest),
        destMap = data.destMap;
    if (destMap !== undefined) {
      destMap = path.join(cwd, destMap);
    } else {
      destMap = destFile + ".map";
    }

    // Determine the relative dest and relative map path (trim off the first ../ since URL's don't need that)
    var relDestPath = path.relative(destFile, destMap),
        relMapPath = path.relative(destFile, destMap);
    relDestPath = relDestPath.replace('../', '');
    relMapPath = relMapPath.replace('../', '');

    // Minify the input
    var retObj = jsmin({
          'input': input,
          'dest': relDestPath,
          'srcRoot': data.srcRoot
        });

    // Grab the minified code
    var code = retObj.code;

    // Append a sourceMappingURL to the code
    code = code + '\n//@ sourceMappingURL=' + relMapPath;

    // Write out the code and map
    grunt.file.write(destFile, code);
    grunt.file.write(destMap, retObj.sourcemap);
  });
};