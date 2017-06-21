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
        <h4 className="text-center">Temperature</h4>
        <Gauge value={this.state.temperature} width="300" height="150"/>
        <h4 className="text-center">Humidity</h4>
        <Gauge value={this.state.humidity} width="300" height="150"/>
        <h4 className="text-center">Light</h4>
        <Gauge value={this.state.light / 10} width="300" height="150"/>
      </div>
    );
  }
}

export default Multisensor;
