// Example React JSX component

import React from 'react'

const MyComponent = ({msg}) => (
  <button>{msg}</button>
)

MyComponent.propTypes = {
  msg: React.PropTypes.string.isRequired
}

export { MyComponent }
