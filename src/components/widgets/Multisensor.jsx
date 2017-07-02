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
          majorTicks={['0', '5', '15', '20', '25', '30', '35', '40', '45', '50']}
          minorTicks={2} />
        <RadialGauge
          units='%'
          title='Humidity'
          height={300}
          value={this.state.humidity}
          minValue={0}
          maxValue={100}
          majorTicks={['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
          minorTicks={5} />
        <RadialGauge
          units='%'
          title='Light'
          height={300}
          value={this.state.light / 10}
          minValue={0}
          maxValue={100}
          majorTicks={['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
          minorTicks={5} />
      </div>
    )
  }
}

Multisensor.propTypes = {
  thing: React.PropTypes.instanceOf(I1820Thing)
}

export default Multisensor
