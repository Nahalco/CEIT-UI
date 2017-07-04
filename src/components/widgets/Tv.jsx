import React from 'react'

import {I1820Thing} from '@i1820/api'

class Tv extends React.Component {
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
        <button type='button' className='btn btn-success m-2' onClick={() => this.turn()}>ON OFF</button>
      </div>
    )
  }
}

Tv.propTypes = {
  thing: React.PropTypes.instanceOf(I1820Thing)
}

export default Tv
