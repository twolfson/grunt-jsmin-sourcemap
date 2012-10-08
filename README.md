# grunt-jsmin-sourcemap

Grunt task for JSMin and sourcemap

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-jsmin-sourcemap`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-jsmin-sourcemap');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation
`grunt-jsmin-sourcemap` is registered under the `jsmin-sourcemap` task. Your initConfig should look similar to this:
```js
grunt.initConfig({
  'jsmin-sourcemap': {
    all: {
      // Source files to concatenate and minify (also accepts a string and minimatch items)
      src: ['public/js/jquery.js', 'public/js/underscore.js'],

      // Destination for concatenated/minified JavaScript
      dest: 'dist/js/all.min.js',

      // Destination for sourcemap of minified JavaScript
      destMap: 'dist/js/all.js.map'
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt][grunt] and test via `npm test`.

## License
Copyright (c) 2012 Todd Wolfson
Licensed under the MIT license.
