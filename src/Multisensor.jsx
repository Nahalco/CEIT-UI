import React from 'react';
import Gauge from 'react-gauge';


class Multisensor extends React.Component {
  constructor(props) {
    super(props);
    this.thing = props.thing;
    this.state = {
      temperature: 0,
      humidity: 0,
      light: 0
    }
  }

  componentDidMount() {
    this.thing.log.then((result) => {
      this.setState({
        temperature: result['temperature']['value'],
        humidity: result['humidity']['value'],
        light: result['light']['value']
      });
    });
  }

  render() {
    return (
      <div>
        <h6>{this.thing.id} @ {this.thing.agentId}</h6>
        <Gauge value={this.state.temperature}/>
        <Gauge value={this.state.humidity}/>
        <Gauge value={this.state.light / 10}/>
      </div>
    );
  }
}

export default Multisensor;
