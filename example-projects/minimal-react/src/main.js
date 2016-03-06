// CSS
import './styles.css'

// External deps
import React from 'react'
import ReactDOM from 'react-dom'

// Internal deps
import { log } from './util.js'
import { MyComponent } from './component.jsx'

function init () {
  log('starting...')
  ReactDOM.render(
    <MyComponent msg='this is a component'/>,
    document.getElementById('app'))
}

document.addEventListener('DOMContentLoaded', init)
