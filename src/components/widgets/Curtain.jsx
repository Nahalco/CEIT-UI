import React from 'react'

import {I1820Thing} from '@i1820/api'

class Curtain extends React.Component {
  constructor (props) {
    super(props)
    this.thing = props.thing
    this.state = {
      counter: 0
    }
  }

  changeHeight () {
    let height = this.state.counter + ''
    height = height.length < 3 ? '0' + height : height
    this.thing.configuration = {
      height
    }
  }

  increase () {
    this.setState({
      counter: this.state.counter + 10
    })
  }

  decrease () {
    this.setState({
      counter: this.state.counter - 10
    })
  }

  render () {
    return (
      <div>
        <button type='button' className='btn btn-success m-2' onClick={() => this.increase()}>+</button>
        {this.state.counter}
        <button type='button' className='btn btn-success m-2' onClick={() => this.decrease()}>-</button>
        <br />
        <button type='button' className='btn btn-info m-2' onClick={() => this.changeHeight()}>Change Height</button>
      </div>
    )
  }
}

Curtain.propTypes = {
  thing: React.PropTypes.instanceOf(I1820Thing)
}

export default Curtain
