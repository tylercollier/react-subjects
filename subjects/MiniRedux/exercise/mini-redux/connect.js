import React from 'react'

export default function connect(mapStateToProps) {

  return function (Component) {
    return class extends React.Component {
      static contextTypes = {
        store: React.PropTypes.object.isRequired,
      }
      compnentDidMount() {
        this.context.store.listen(() => {
          this.forceUpdate()
        })
      }
      render() {
        const props = mapStateToProps(this.context.store.getState())
        return <Component {...props} dispatch={this.context.store.dispatch} />
      }
    }
  }
}
