import React from 'react'

import {I1820Thing} from '@i1820/api'

class Cooler extends React.Component {
  constructor (props) {
    super(props)
    this.thing = props.thing
    this.state = {
      mode: 'OFF'
    }
  }

  turn (event) {
    switch (event.target.value) {
      case '0':
        this.setState({
          mode: 'OFF'
        })
        this.thing.configuration = {
          on: false
        }
        break
      case '10':
        this.setState({
          mode: 'Cool'
        })
        this.thing.configuration = {
          on: true,
          temperature: 16
        }
        break
      case '20':
        this.setState({
          mode: 'Fan'
        })
        this.thing.configuration = {
          on: true,
          temperature: 25
        }
        break
      case '30':
        this.setState({
          mode: 'Heat'
        })
        this.thing.configuration = {
          on: true,
          temperature: 30
        }
        break
    }
  }

  render () {
    return (
      <div>
        <h4>{this.state.mode}</h4>
        <input type='range' defaultValue='0' min='0' max='30' step='10' onChange={(event) => this.turn(event)} />
      </div>
    )
  }
}

Cooler.propTypes = {
  thing: React.PropTypes.instanceOf(I1820Thing)
}

export default Cooler
