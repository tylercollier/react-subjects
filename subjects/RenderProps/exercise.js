////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Refactor App by creating a new component named `<GeoPosition>`
// - <GeoPosition> should use a child render callback that passes
//   to <App> the latitude and longitude state
// - When you're done, <App> should no longer have anything but
//   a render method
// - now create a <GeoAddress> component that also uses a render
//   callback with the current address. You will use
//   `getAddressFromCoords(latitude, longitude)` to get the
//   address, it returns a promise.
// - You should be able to compose <GeoPosition> and <GeoAddress>
//   beneath it to naturally compose both the UI and the state
//   needed to render it
// - Make sure GeoAddress supports the user moving positions
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import LoadingDots from './utils/LoadingDots'
import getAddressFromCoords from './utils/getAddressFromCoords'


class GeoPosition extends React.Component {
  static propTypes = {
    children: React.PropTypes.func.isRequired,
  }
  state = {
    coords: {
      latitude: null,
      longitude: null
    },
    error: null,
  }

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
      },
      (error) => {
        this.setState({ error })
      }
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId)
  }
  render() {
    return this.props.children(this.state)
  }
}

class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Geolocation</h1>
        <GeoPosition>
          {({ coords: { latitude, longitude }, error }) => {
            return error ? (
              <div>{error.message}</div>
            ) : (
              <dl>
                <dt>Latitude</dt>
                <dd>{latitude || <LoadingDots/>}</dd>
                <dt>Longitude</dt>
                <dd>{longitude || <LoadingDots/>}</dd>
              </dl>
            )}
          }
        </GeoPosition>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
