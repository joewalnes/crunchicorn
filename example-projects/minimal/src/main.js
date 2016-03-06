// CSS
import './styles.css'

// External deps
// import foo from 'somelib'

// Internal deps
import { log } from './util.js'

function init () {
  log('starting...')
  document.getElementById('app').textContent = 'Hello from JavaScript!'
}

document.addEventListener('DOMContentLoaded', init)
