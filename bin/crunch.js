#!/usr/bin/env node
'use strict'

const chokidar = require('chokidar'),
      crunch = require('../lib/crunch.js'),
      yargs = require('yargs')

const argv = yargs
    .usage('Usage: $0 [args] <in> <out>')
    .demand(2, 2, 'require input and output files')
    .options({
      'banner': {
        describe: 'include banner comment, e.g. "copyright blah"',
        type: 'string',
      },
      'nomap': {
        describe: 'do not write source map (.js.map)',
        type: 'boolean',
      },
      'nofontface': {
        describe: 'disable auto @font-face',
        type: 'boolean',
      },
      'nolint': {
        describe: 'do not lint source files',
        type: 'boolean'
      },
      'debug': {
        alias: 'd',
        describe: 'debug build (does not minify output)',
        type: 'boolean',
      },
      'watch': {
        alias: 'w',
        describe: 'keep running and rebuild whenever input files change',
        type: 'boolean',
      },
    })
    .help('help')
    .alias('h', 'help')
    .version()
    .epilog('https://github.com/joewalnes/crunchicorn')
    .argv

const src = argv._[0],
      dest = argv._[1],
      opts = {
        banner: argv.banner,
        css: true,
        sourceMap: !argv.nomap,
        minifyCss: !argv.debug,
        minifyJs: !argv.debug,
        fontMagician: !argv.nofontface,
        lintJs: !argv.nolint,
        resolve: true,
      }

if (argv.watch) {

  let deps = [src]
  let watcher = chokidar.watch(deps, {})

  function updateDeps(newDeps) {
    for (let dep of newDeps) {
      if (deps.indexOf(dep) == -1) {
        //console.log('+ watch', dep)
        watcher.add(dep)
      }
    }
    for (let dep of deps) {
      if (newDeps.indexOf(dep) == -1) {
        // console.log('- watch', dep)
        watcher.unwatch(dep)
      }
    }
    deps = newDeps
  }

  function doCrunch() {
    process.stdout.write(`! building ${dest} ... `)
    crunch.crunchJs(src, dest, opts)
      .then(result => {
        console.log('OK')
        updateDeps(result.deps)
      })
      // TODO: how to handle errors?
      // See https://github.com/rollup/rollup/issues/545
      .catch(err => console.log('ERROR', err))
  }

  watcher.on('change', doCrunch)
  doCrunch()

} else {

  crunch.crunchJs(src, dest, opts).catch(err => {
    console.error('ERROR', err)
    process.exit(1)
  })

}
