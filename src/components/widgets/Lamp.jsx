import React from 'react'

import {I1820Thing} from '@i1820/api'

class Lamp extends React.Component {
  constructor (props) {
    super(props)
    this.things = props.things
    this.state = {
      selectedThing: this.things[0]
    }
  }

  turn (on) {
    this.state.selectedThing.configuration = {
      on
    }
  }

  changeSelectedThing (thingId) {
    let selectedThing = null
    for (const thing of this.things) {
      if (thing.id === thingId) {
        selectedThing = thing
      }
    }
    this.setState({
      selectedThing
    })
  }

  render () {
    const options = []
    for (const thing of this.things) {
      options.push((
        <option value={thing.id} key={thing.id} >{thing.id}</option>
      ))
    }
    return (
      <div>
        <h4>Lamp
          <select className='custom-select mb-2 ml-sm-2 mb-sm-0' onChange={(event) => this.changeSelectedThing(event.target.value)}>
            {options}
          </select>
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

Lamp.propTypes = {
  things: React.PropTypes.arrayOf(React.PropTypes.instanceOf(I1820Thing))
}

export default Lamp
