////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// This Modal, even though its a React component, has an imperative API to
// open and close it. Can you convert it to a declarative API?
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import $ from 'jquery'
import 'bootstrap-webpack'

class Modal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string.isRequired,
    children: PropTypes.node
  }

  componentDidUpdate() {
    console.log('isOpen', this.props.isOpen)
    // $(this.refs.modal).modal(this.props.isOpen ? 'show' : 'hide')
    if (this.props.isOpen) {
      $(this.refs.modal).modal('show')
    } else {
      $(this.refs.modal).modal('hide')
    }
    // $(findDOMNode(this)).modal(this.props.isOpen ? 'show' : 'hide')
    console.log('called ' + (this.props.isOpen ? 'show' : 'hide'))
  }

  render() {
    return (
      <div ref="modal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isOpen: false,
    }
  }
  openModal = () => {
    // $(findDOMNode(this.refs.modal)).modal('show')
    this.setState({ isOpen: true })
  }

  closeModal = () => {
    // $(findDOMNode(this.refs.modal)).modal('hide')
    this.setState({ isOpen: false })
  }

  render() {
    return (
      <div className="container">
        <pre>{JSON.stringify(this.state)}</pre>
        <h1>Let’s make bootstrap modal declarative</h1>

        <button
          className="btn btn-primary"
          onClick={this.openModal}
        >open modal</button>

        <Modal isOpen={this.state.isOpen} title="Declarative is better">
          <p>Calling methods on instances is a FLOW not a STOCK!</p>
          <p>It’s the dynamic process, not the static program in text space.</p>
          <p>You have to experience it over time, rather than in snapshots of state.</p>
          <button
            onClick={this.closeModal}
            type="button"
            className="btn btn-default"
          >Close</button>
        </Modal>

      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
