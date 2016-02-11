webtoolz : Simplifying the web toolchain
========================================

The JavaScript ecosystem is complex and continually evolving. This is an attempt to simplify it. Goals of this project:

* Provide an out-of-the-box toolchain for JS/CSS projects
* Highly opinionated sensible defaults
* Command line tool (plays well with other tools, including shell scripts, make, npm run, etc)
* No config files
* 'Batteries included' toolchain: ES2015 (and more) transpiling, enforce coding standards, module packaging, shrinking, testing, CSS pre-processing
* Designed for browser apps - you don't need to know NodeJS

Usage
-----

Install globally:

```bash
$ npm install -g webtoolz
$ webtoolz -h              # run it
```

Alternatively, install just for your current project:

```bash
$ npm install --save-dev webtoolz
$ $(npm bin)/webtoolz -h   # run it, using npm local bin path
```

Run:

```bash
$ webtoolz myapp.js src/
```

Usage:

```
webtoolz OUTPUT DIR [DIR...]

OUTPUT              Output JS file. This will also include auto-injected CSS. Use '-'
                    for stdout.

DIR                 Input directory. Multiple directories may be specified. All .js, .jsx,
                    and .css files under the tree will be processed.



Common options:

-h --help           This.

-w --watch          Keep running and automatically rebuild when any dependency changes.

-t --test FILE      Source file or directory to run unit tests. If directory, will be
                    recursively searched for .js files. Glob patterns will be expanded.
                    This option can be specified multiple times to search multiple dirs.

--[semi]standard    Fail if code does not meet coding standards. See http://standardjs.com
                    'standard' enforces no semicolons, 'semistandard' enforces semicolons.



Advanced options:

-v --verbose        Show what's going on under the hood.

--[no]minify        Whether to minify results or not. Default is to write both minified
                    and unminified with source maps.

--[no]pretty        Whether to use human friendly pretty output (colors, progress bars, ascii art,
                    etc). Defaults to pretty is used from a TTY (e.g. terminal) or nopretty if
                    no terminal (e.g. unattended script, build server...).

-e --exclude PAT    Patterns to exclude in DIR (may contain globs).

-i --include PAT    Override --exclude.

--babelpreset PRES  Babel preset to use for transpiling JS. See https://babeljs.io/docs/plugins/.
                    Default is 'es2015', unless .jsx files are present, in which case
                    it's 'react'.

--babelplugin PLUG  Additional Babel plugins to use. See https://babeljs.io/docs/plugins/.
                    Default is none (relies on babelpreset). This option can be specified
                    multiple times to include multiple plugins.


```

Under the hood
--------------

* enforce JS coding standards with [StandardJS](http://standardjs.com/)
* transpile JS with [Babel](https://babeljs.io)
* bundle and shrink JS with [Rollup](http://rollupjs.org)
* run JS unit tests with [Mocha](https://mochajs.org/)
* minify JS with [Uglify](http://lisperator.net/uglifyjs/)
* transpile CSS with [postcss](https://github.com/postcss/postcss)
* minify CSS with [cssnano](http://cssnano.co/)

