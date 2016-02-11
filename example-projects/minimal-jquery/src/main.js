// CSS
import './styles.css'

// External deps
import $ from 'jquery'

// Internal deps
import { log } from './util.js'

$(() => { // shortcut for jquery.ready()
  log('starting...')
  $('#app').text('Hello, thanks to jQuery')
})
