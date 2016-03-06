'use strict'

const babel = require('rollup-plugin-babel'),
      commonjs = require('rollup-plugin-commonjs'),
      cssnano = require('cssnano'),
      cssnext = require('postcss-cssnext'),
      fontmagician = require('postcss-font-magician'),
      mkdirp = require('mkdirp'),
      nodeResolve = require('rollup-plugin-node-resolve'),
      path = require('path'),
      postcss = require('rollup-plugin-postcss'),
      replace = require('rollup-plugin-replace'),
      rollup = require('rollup'),
      uglify = require('rollup-plugin-uglify')

function prune(arr) {
  return arr.filter(o => o)
}

exports.crunchJs = function(src, dest, opts) {
  // opts:
  // - banner (string)
  // - css (boolean)
  // - minifyCss (boolean)
  // - minifyJs (boolean)
  // - sourceMap (boolean)
  // - resolve (boolean)
  // - nodeEnv (string), default: production
  // - fontMagician (boolean)

  if (!opts) {
    opts = {}
  }

  return rollup.rollup({
    entry: src,
    banner: opts.banner,
    //onwarn: () => { console.log('WARN', arguments) }, // TODO
    onwarn: () => { }, // TODO
    plugins: prune([

      opts.resolve && nodeResolve({
        jsnext: true,
        main: true,
        browser: true,
      }),

      opts.resolve && commonjs(),

      // TODO: only if CSS actually used
      opts.css && postcss({
        plugins: prune([
          cssnext(),
          opts.fontMagician && fontmagician(),
          opts.minifyCss && cssnano(),
        ]),
      }),

      babel({
        presets: [
          'es2015-rollup',
          'stage-3',
          'stage-2',
          'stage-1',
          'stage-0',
          'react',
        ],
        babelrc: false,
        exclude: 'node_modules/**',
      }),

      replace({
        'process.env.NODE_ENV': JSON.stringify(opts.nodeEnv || 'production'),
      }),

      opts.minifyJs && uglify(),

    ])
  }).then(result => {

    mkdirp.sync(path.dirname(dest))

    result.write({
      banner: opts.banner,
      dest: dest,
      format: 'iife',
      sourceMap: opts.sourceMap,
    })

    return {
      type: 'js',
      src: src,
      dest: dest,
      map: opts.sourceMap ? dest + '.map' : null,
      imports: result.imports,
      deps: result.modules.map(m => path.relative('.', m.id)),
    }
  })
}
