import React from 'react'

class Provider extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
  }
  static childContextTypes = {
    store: React.PropTypes.object.isRequired,
  }
  getChildContext() {
    return {
      store: this.props.store,
    }
  }
  render() {
    return <div>{this.props.children}</div>
  }
}

export default Provider
