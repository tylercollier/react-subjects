////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMousePosition`a a "higher-order component" that sends the mouse
// position to the component as props.
//
// hint: use `event.clientX` and `event.clientY`

import React from 'react'
import { render } from 'react-dom'

const withMousePosition = (Component) => {
  return class extends React.Component {
    state = {
      x: 0,
      y: 0,
    }
    constructor() {
      super()
      this.onMouseMove = this.onMouseMove.bind(this)
    }
    onMouseMove(event) {
      this.setState({
        x: event.clientX,
        y: event.clientY,
      })
    }
    render() {
      return (
        <div onMouseMove={this.onMouseMove}>
          <Component mouse={{ x: this.state.x, y: this.state.y }} />
        </div>
      )
    }
  }
}

class App extends React.Component {

  static propTypes = {
    mouse: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired
    }).isRequired
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <h1>With the mouse!</h1>
        <pre>{JSON.stringify(this.props.mouse, null, 2)}</pre>
      </div>
    )
  }
}

const AppWithMouse = withMousePosition(App)

render(<AppWithMouse/>, document.getElementById('app'))

