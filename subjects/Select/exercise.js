import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import './styles.css'

const { func, any } = PropTypes


////////////////////////////////////////////////////////////////////////////////
// Requirements
//
// Make this work like a normal <select><option/></select>

class Select extends React.Component {
  static propTypes = {
    onChange: func,
    value: any,
    defaultValue: any,
  }

  state = {
    showList: false,
    value: null,
  }

  componentDidMount() {
    this.setState({ value: this.props.defaultValue })
  }

  render() {
    return (
      <div className="select">
        <div onClick={() => this.setState({ showList: !this.state.showList })} className="label">{this.props.value || this.state.value} <span className="arrow">▾</span></div>
        <div className="options">
          {this.state.showList ? React.Children.map(this.props.children, c => {
            return React.cloneElement(c, { onChange: value => {
              this.setState({ showList: false })
              this.props.onChange
                ? this.props.onChange(value)
                : this.setState({ value })
            }})
          }) : []}
        </div>
      </div>
    )
  }
}


class Option extends React.Component {
  render() {
    return (
      <div onClick={event => this.props.onChange(this.props.value)} className="option">{this.props.children}</div>
    )
  }
}

class Lightbulb extends React.Component {
  state = {
    isOn: false,
  }

  render() {
    return (
      <div>
        Light bulb is {this.state.isOn ? 'on' : 'off' }
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

class Lightbulb2 extends React.Component {
  state = {
    isOn: false,
  }

  render() {
    return (
      <div>
        Light bulb is {this.state.isOn ? 'on' : 'off' }
        <div>
          {this.props.component({
            turnOn: () => this.setState({ isOn: true }),
            turnOff: () => this.setState({ isOn: false}),
            flip: () => this.setState({ isOn: !this.state.isOn })
          })}
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    selectValue: 'dosa'
  }

  setToMintChutney = () => {
   this.setState({selectValue: 'mint-chutney'})
  }

  render() {
    return (
      <div>
        <h1>Select/Option</h1>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        <h2>Controlled</h2>
        <p>
          <button onClick={this.setToMintChutney}>Set to Mint Chutney</button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={(selectValue) => this.setState({ selectValue })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Uncontrolled</h2>
        <Select defaultValue="tandoori-chicken">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h1>Tyler</h1>

        <Lightbulb>
          <button onClick={this.props.turnOn}>Turn on</button>
          <button onClick={this.props.turnOff}>Turn off</button>
        </Lightbulb>

        <Lightbulb2 component={this.myLightbulb2 = ({turnOn, turnOff, flip}) => (
          <div>
            <button onClick={turnOn}>Turn on</button>
            <button onClick={turnOff}>Turn off</button>
            <button onClick={flip}>Flip</button>
          </div>
        )}/>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
