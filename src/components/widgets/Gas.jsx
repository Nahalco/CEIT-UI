import React from 'react'

import {RadialGauge} from 'react-canvas-gauges'
import {I1820Thing} from '@i1820/api'

class Gas extends React.Component {
  constructor (props) {
    super(props)
    this.thing = props.thing

    this.state = {
      gas: 0
    }

    this.thing.on('log', (result) => {
      console.log(result)
      this.setState({
        gas: result['gas']
      })
    })
  }

  componentDidMount () {
    this.thing.log.then((result) => {
      this.setState({
        gas: result['gas']['value']
      })
    })
  }

  render () {
    return (
      <div>
        <RadialGauge
          title='Gas'
          height={300}
          value={(this.state.gas - 600) / 1.5}
          minValue={0}
          maxValue={100}
          majorTicks={['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
          highlights={[
            { from: 15, to: 100, color: 'rgba(255,0,0,.15)' }
          ]}
          minorTicks={2} />
      </div>
    )
  }
}

Gas.propTypes = {
  thing: React.PropTypes.instanceOf(I1820Thing)
}

export default Gas
