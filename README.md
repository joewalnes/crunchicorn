crunchicorn: Simplifying the web toolchain
==========================================

The JavaScript ecosystem is complex and continually evolving. This is an attempt to simplify it. Goals of this project:

* Provide an out-of-the-box toolchain for JS/CSS projects
* Highly opinionated sensible defaults
* Embrace modern standards
* Command line tool (plays well with other tools, including shell scripts, make, npm run, etc)
* **NO CONFIG FILES**
* 'Batteries included' toolchain: ES2015 (and more) transpiling, enforce coding standards, ES import module packaging, shrinking, testing, CSS pre-processing
* Designed for browser apps - you don't need to know NodeJS
* Agnostic about client side frameworks (use React, Angular, jQuery, Polymer, Ember, nothing... it doesn't care)
* No server-side coupling: it just compiles your client side code. It's up to you what you use on the server (Rails, Node, Go, Java, ASP.NET, PHP, static webserver...)

crunchicorn takes two arguments:
1. An entry point .js for your app in a source tree consisting of ES2015 code, modules, CSS, etc.
2. An output .js file that can be included in your final web page with a single `<script src=...>` element. Transpiled,
   resolved, validated, crunched, everything.

crunchicorn was born out of frustration with how complicated it is to get JavaScript tooling setup for real world projects.

10 second tutorial
------------------

Assuming you keep your soure tree in `src/`, which contains ES2015 syntax code, imports, CSS, etc, and the entry point is `src/myapp.js`.

This single command (no config necessary) will do everything to validate, transpile, resolve modules, drop dead code, and compress into a single file:

```bash
$ crunchicorn src/myapp.js out/myapp.js
```

The resulting file is now ready to be used directly in your web-app. It will include all dependencies and even inject your CSS:

```html
<script src="myapp.js"></script>
```

Voila. No config - it just worked!

Example projects
----------------

[Here](/example-projects/)


File watching
-------------

You can leave crunchicorn running and it will automatically rebuild whenever it notices any files have changed:

```bash
$ crunchicorn --watch src/myapp.js out/myapps.js
```

Install
-------

Install globally:

```bash
$ npm install -g crunchicorn
```

Alternatively, install just for your current project:

```bash
$ npm install --save-dev crunchicorn
```

Or in `package.json`:

```json
{
  "dependencies": {
     "crunchicorn": "*"
  }
}
```

Note: If not installed globally, you'll need to include node_module/.bin in your path

Reference
---------

For help:

```
$ crunchicorn --help
```

Under the hood
--------------

* bundle ES6 modules with [Rollup](http://rollupjs.org)
* bundle CSS modules with [postcss](https://github.com/postcss/postcss)
* transpile future JS (ES2015) with [Babel](https://babeljs.io)
* transpile future CSS with [cssnext](http://cssnext.io/)
* automatically insert @font-face with [Font Magician](https://github.com/jonathantneal/postcss-font-magician)
* shrink JS with [UglifyJS2](http://lisperator.net/uglifyjs/)
* shrink CSS with [cssnano](http://cssnano.co/)
* [TODO] lint JS with [StandardJS](http://standardjs.com/)
* [TODO] lint CSS with [stylelint](http://stylelint.io/)
