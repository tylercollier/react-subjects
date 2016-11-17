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
    showList: true,
  }

  render() {
    return (
      <div className="select">
        <div onClick={() => this.setState({ showList: true })} className="label">{this.props.value} <span className="arrow">▾</span></div>
        <div className="options">
          {this.state.showList ? React.Children.map(this.props.children, c => {
            return React.cloneElement(c, { onChange: value => {
              this.setState({ showList: false })
              this.props.onChange(value)
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
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
