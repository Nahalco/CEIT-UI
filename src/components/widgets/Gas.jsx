import React from 'react'

import {RadialGauge} from 'react-canvas-gauges'

class Gas extends React.Component {
  constructor (props) {
    super(props)
    this.thing = props.thing
    this.state = {
      gas: 0
    }
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
          value={this.state.gas - 512}
          minValue={0}
          maxValue={200}
          majorTicks={['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
          minorTicks={2} />
      </div>
    )
  }
}

export default Gas
