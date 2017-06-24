import React from 'react';

class Mode extends React.Component {
  constructor(props) {
    super(props);
    this.thing = props.thing;
    this.state = {
      mode: 'off'
    };
  }

  turn(event) {
    switch(event.target.value) {
      case "0":
        this.setState({
          mode: "off"
        });
        this.thing.configuration = {
          on: false
        };
        break;
      case "10":
        this.setState({
          mode: "Cool"
        });
        this.thing.configuration = {
          on: true,
          temperature: 16
        };
        break;
      case "20":
        this.setState({
          mode: "Fan"
        });
        this.thing.configuration = {
          on: true,
          temperature: 25
        };
        break;
      case "30":
        this.setState({
          mode: "Heat"
        });
        this.thing.configuration = {
          on: true,
          temperature: 30
        };
        break;
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">
            Cooler
          </h4>
          <p className="card-text">{this.state.mode}</p>
          <input type="range" defaultValue="0" min="0" max="30" step="10" onChange={(event) => this.turn(event)} />
        </div>
      </div>
    );
  }
}

export default Mode
