import React from 'react';

class Lamp extends React.Component {
  constructor(props) {
    super(props);
    this.things = props.things;
    this.state = {
      selectedThing: this.things[0]
    }
  }

  turn(on) {
    this.state.selectedThing.configuration = {
      on
    };
  }

  changeSelectedThing(thingId) {
    let selectedThing = null;
    for (const thing of this.things) {
      if (thing.id === thingId) {
        selectedThing = thing;
      }
    }
    this.setState({
      selectedThing
    });
  }

  render() {
    const options = [];
    for (const thing of this.things) {
      options.push((
        <option value={thing.id} key={thing.id} >{thing.id}</option>
      ));
    }
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">Lamp {this.state.selectedThing.id}</h4>
          <select className="custom-select mb-2 mr-sm-2 mb-sm-0" onChange={(event) => this.changeSelectedThing(event.target.value)}>
            {options}
          </select>
          <div className="btn-group" data-toggle="buttons">
            <label className="btn btn-lg btn-primary">
              <input type="checkbox" autoComplete="off" onClick={() => this.turn(true)} /> On
            </label>
            <label className="btn btn-lg btn-primary">
              <input type="checkbox" autoComplete="off" onClick={() => this.turn(false)} /> Off
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Lamp;
