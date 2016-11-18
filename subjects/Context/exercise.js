/*eslint-disable no-alert */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> "submits" the form
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onChange> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
//
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render } from 'react-dom'

class Form extends React.Component {
  state = {
    values: {},
  }
  static childContextTypes = {
    submit: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }
  getChildContext() {
    return {
      submit: this.props.onSubmit,
      onChangeValue: (name, value) => {
        this.setState({
          values: {
            ...Object.assign({}, this.state.values, {
              [name]: value,

            })
          }
        }, () => {
          this.props.onChange(this.state.values)
        })
      },
      reset: () => {
        this.setState({ values: {} })
      }
    }
  }
  render() {
    // return <div>{this.props.children}</div>
    return <div>
      <pre>{JSON.stringify(this.state.values, null, 2)}</pre>
      {React.Children.map(this.props.children, c => {
        if (c.type === TextInput) {
          return React.cloneElement(c, Object.assign({}, c.props, { value: this.state.values[c.props.name] }))
        }
        return c
      })}
    </div>
  }
}

class SubmitButton extends React.Component {
  static contextTypes = {
    submit: PropTypes.func.isRequired,
  }
  render() {
    return <button onClick={this.context.submit}>{this.props.children}</button>
  }
}

class ResetButton extends React.Component {
  static contextTypes = {
    reset: PropTypes.func.isRequired,
  }
  render() {
    return <button onClick={this.context.reset}>{this.props.children}</button>
  }
}

class TextInput extends React.Component {
  static contextTypes = {
    submit: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    value: PropTypes.string,
  }
  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            this.context.submit()
          }
        }}
        value={this.props.value}
        onChange={(event) => {
          console.log('event', event)
          this.setState({ value: event.target.value })
          this.context.onChangeValue(this.props.name, event.target.value)
        }}
      />
    )
  }
}

class App extends React.Component {
  handleSubmit = () => {
    alert('YOU WIN!')
  }

  onChange(values) {
    console.log('values', values)
  }

  render() {
    return (
      <div>
        <h1>This isn't even my final <code>&lt;Form/&gt;</code>!</h1>

        <Form onReset={this.reset} onChange={this.onChange} onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name"/> {' '}
            <TextInput name="lastName" placeholder="Last Name"/>
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
            <ResetButton>Reset</ResetButton>
          </p>
        </Form>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
