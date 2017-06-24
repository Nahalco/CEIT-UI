import React from 'react';

class Mode extends React.Component {
  constructor(props) {
    super(props);
    this.thing = props.thing;
    this.state = {
      mode: 'Off'
    };
  }

  turn(event) {
    switch(event.target.value) {
      case "0":
        this.setState({
          mode: "off"
        });
        break;
      case "10":
        this.setState({
          mode: "Cool"
        });
        break;
      case "20":
        this.setState({
          mode: "Fan"
        });
        break;
      case "30":
        this.setState({
          mode: "Heat"
        });
        break;
    }
    this.thing.configuration = {
    };
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
