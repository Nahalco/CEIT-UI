import React from 'react'

import {I1820Thing} from '@i1820/api'

class Projector extends React.Component {
  constructor (props) {
    super(props)
    this.thing = props.thing
  }

  turn () {
    this.thing.configuration = {
      on: true
    }
  }

  render () {
    return (
      <div>
        <button type='button' className='btn btn-success' onClick={() => this.turn()}>ON OFF</button>
      </div>
    )
  }
}

Projector.propTypes = {
  thing: React.PropTypes.instanceOf(I1820Thing)
}

export default Projector
