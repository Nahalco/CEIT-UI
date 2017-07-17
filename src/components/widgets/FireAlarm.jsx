import React from 'react'

import {I1820Thing} from '@i1820/api'

class FireAlarm extends React.Component {
  constructor (props) {
    super(props)
    this.thing = props.thing

    this.state = {
      alram: false
    }

    this.thing.on('log', (result) => {
      if (result['gas'] >= 610) {
        this.setState({
          alarm: true
        })
      } else {
        this.setState({
          alarm: false
        })
      }
    })
  }

  componentDidMount () {
  }

  render () {
    if (this.state.alarm) {
      return (
        <h1 className='font-weight-bold text-danger display-4'>Fire</h1>
      )
    } else {
      return (
        <h1 className='display-4'>No Fire</h1>
      )
    }
  }
}

FireAlarm.propTypes = {
  thing: React.PropTypes.instanceOf(I1820Thing)
}

export default FireAlarm
