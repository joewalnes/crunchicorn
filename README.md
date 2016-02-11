webtoolz : Simplifying the web toolchain
========================================

The JavaScript ecosystem is complex and continually evolving. This is an attempt to simplify it. Goals of this project:

* Provide an out-of-the-box toolchain for JS/CSS projects
* Highly opinionated sensible defaults
* No config files
* Command line tool
* Minimal options

The cast:

* enforce JS coding standards with [StandardJS](http://standardjs.com/)
* transpile JS with [Babel](https://babeljs.io)
* bundle and shrink JS with [Rollup](http://rollupjs.org)
* run JS unit tests with [Mocha](https://mochajs.org/)
* minify JS with [Uglify](http://lisperator.net/uglifyjs/)
* transpile CSS with [postcss](https://github.com/postcss/postcss)
* minify CSS with [cssnano](http://cssnano.co/)

Usage
-----

Install:

```bash
$ npm install -g webtoolz
```

Run:

```bash
$ webtoolz out/myapp
```

Usage:

```
webtoolz OUTPUT INPUT [INPUT...]

OUTPUT        Output JS file. This will also include auto-injected CSS.

INPUT         Input source file or directory. If directory, will be recursively
              searched for .js and .css files. Glob patterns will be expanded.
              This option can be specified multiple times to search multiple dirs.

Options:

--test              Source file or directory to run unit tests for. If directory, will be
                    recursively searched for .js files. Glob patterns will be expanded.
                    This option can be specified multiple times to search multiple dirs.

--[no]minify        Whether to minify results or not. Default is to write both minified
                    and unminified with source maps.

-e --exclude        Patterns to exclude (may contain globs).

-i --include        Override --exclude.

--babelpreset       Babel preset to use. See https://babeljs.io/docs/plugins/.
                    Default is 'es2015', unless .jsx files are present, in which case
                    it's 'react'.

--babelplugin       Additional Babel plugins to use. See https://babeljs.io/docs/plugins/.
                    Default is none (relies on babelpreset). This option can be specified
                    multiple times to include multiple plugins.

--[semi]standard    Fail if code does not meet coding standards. See http://standardjs.com
                    'standard' enforces no semicolons, 'semistandard' enforces semicolons.

-w --watch          Keep running and automatically rebuild when any dependency changes.

-v --verbose        Show what's going on under the hood.
```
