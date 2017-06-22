import React from 'react';

import {LinearGauge} from 'canvas-gauges';

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
    setTimeout(() => {
      this.thing.log.then((result) => {
        this.setState({
          temperature: result['temperature']['value'],
          humidity: result['humidity']['value'],
          light: result['light']['value']
        });
      });
    }, 1);
  }

  render() {
    let gauge = document.createElement('canvas');
    new LinearGauge({
      renderTo: gauge,
      width: 100,
      height: 300,
      value: this.state.temperature
    })
    return (
      <div>
        <canvas data-type="radial-gauge"
          data-width="400"
          data-height="400"
          data-units="°C"
          data-title="Temperature"
          data-value={this.state.temperature}
          data-min-value="0"
          data-max-value="50"
          data-major-ticks="0,5,15,20,25,30,35,40,45,50"
          data-minor-ticks="2"
          data-stroke-ticks="false"
          data-animated-value="true"
        ></canvas>
        <h4 className="text-center">Humidity</h4>
        {gauge}
        <h4 className="text-center">Light</h4>
        <div id="LightGauge"></div>
      </div>
    );
  }
}

export default Multisensor;
