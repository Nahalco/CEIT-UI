import React from 'react'

import {I1820Thing} from '@i1820/api'

class Mode extends React.Component {
  constructor (props) {
    super(props)
    this.thing = props.thing
  }

  turn (on) {
    this.thing.configuration = {
      on
    }
  }

  render () {
    return (
      <div>
        <h4>
          {this.thing.id.charAt(0).toUpperCase() + this.thing.id.slice(1)} Mode
        </h4>
        <div className='btn-group' data-toggle='buttons'>
          <label className='btn btn-lg btn-info'>
            <input type='checkbox' autoComplete='off' onClick={() => this.turn(true)} /> On
          </label>
          <label className='btn btn-lg btn-danger'>
            <input type='checkbox' autoComplete='off' onClick={() => this.turn(false)} /> Off
          </label>
        </div>
      </div>
    )
  }
}

Mode.propTypes = {
  thing: React.PropTypes.instanceOf(I1820Thing)
}

export default Mode
