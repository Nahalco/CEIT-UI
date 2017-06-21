import React from 'react';

class Mode extends React.Component {
  constructor(props) {
    super(props);
    this.thing = props.thing;
  }

  turn(on) {
    this.thing.configuration = {
      on
    };
  }

  render() {
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">{this.thing.id}</h4>
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

export default Mode
