import React from 'react'

import {RadialGauge} from 'react-canvas-gauges'
import {I1820Thing} from '@i1820/api'

class Multisensor extends React.Component {
  constructor (props) {
    super(props)

    this.thing = props.thing

    this.state = {
      temperature: 0,
      humidity: 0,
      light: 0
    }

    this.thing.on('log', (result) => {
      console.log(result)
      this.setState({
        temperature: result['temperature'],
        humidity: result['humidity'],
        light: result['light']
      })
    })
  }

  componentDidMount () {
    this.thing.log.then((result) => {
      this.setState({
        temperature: result['temperature']['value'],
        humidity: result['humidity']['value'],
        light: result['light']['value']
      })
    })
  }

  render () {
    return (
      <div>
        <RadialGauge
          units='°C'
          title='Temperature'
          height={300}
          value={this.state.temperature}
          minValue={0}
          maxValue={50}
          majorTicks={['10', '15', '20', '25', '30', '35', '40', '45', '50']}
          highlights={[
            { from: 0, to: 25, color: 'rgba(0,255,0,.15)' },
            { from: 25, to: 35, color: 'rgba(255,255,0,.15)' },
            { from: 35, to: 50, color: 'rgba(255,30,0,.25)' }
          ]}
          minorTicks={2} />
        <RadialGauge
          units='%'
          title='Humidity'
          height={300}
          value={this.state.humidity}
          minValue={0}
          maxValue={100}
          majorTicks={['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
          minorTicks={6} />
        <RadialGauge
          units='%'
          title='Light'
          height={300}
          value={this.state.light / 10}
          minValue={0}
          maxValue={100}
          majorTicks={['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
          highlights={[
            { from: 0, to: 30, color: 'rgba(0,0,0,.15)' },
            { from: 50, to: 80, color: 'rgba(255,255,0,.15)' },
            { from: 80, to: 100, color: 'rgba(255,255,0,.5)' }
          ]}
          minorTicks={0} />
      </div>
    )
  }
}

Multisensor.propTypes = {
  thing: React.PropTypes.instanceOf(I1820Thing)
}

export default Multisensor
