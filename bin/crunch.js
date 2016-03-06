#!/usr/bin/env node
'use strict'

const crunch = require('../lib/crunch.js'),
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
      'debug': {
        alias: 'd',
        describe: 'debug build (does not minify output)',
        type: 'boolean',
      },
    })
    .help('help')
    .alias('h', 'help')
    .version()
    .epilog('https://github.com/joewalnes/crunchicorn')
    .argv

crunch.crunchJs(argv._[0], argv._[1], {
  banner: argv.banner,
  css: true,
  sourceMap: !argv.nomap,
  minifyCss: !argv.debug,
  minifyJs: !argv.debug,
  fontMagician: !argv.nofontface,
  resolve: true,
}).then(result => {
  //console.log('SUCCESS', result)
}).catch(err => {
  console.error('ERROR', err)
  process.exit(1)
})
