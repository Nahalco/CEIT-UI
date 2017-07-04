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
        <div className='alert alert-danger' role='alert'>
          <h4 className='alert-heading'>Fire !?!</h4>
        </div>
      )
    } else {
      return (
        <div className='alert alert-success' role='alert'>
          <h4 className='alert-heading'>There is no fire</h4>
        </div>
      )
    }
  }
}

FireAlarm.propTypes = {
  thing: React.PropTypes.instanceOf(I1820Thing)
}

export default FireAlarm
