import React from 'react';


class Multisensor extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <canvas data-type="radial-gauge"
          data-width="300"
          data-height="300"
          data-title="Temperature"
          data-min-value="0"
          data-max-value="50"
          data-major-ticks="0,5,10,15,20,25,30,35,40,45,50"
          data-minor-ticks="2"
          data-value="22.3"
          data-units="°C"
        ></canvas>
        <canvas data-type="radial-gauge"
          data-width="300"
          data-height="300"
          data-title="Humidity"
          data-min-value="0"
          data-max-value="100"
          data-major-ticks="0,10,20,30,40,50,60,70,80,90,100"
          data-minor-ticks="2"
          data-value="50"
          data-units="%"
        ></canvas>
        <canvas data-type="radial-gauge"
          data-width="300"
          data-height="300"
          data-title="Light"
          data-min-value="0"
          data-max-value="50"
          data-major-ticks="0,10,20,30,40,50"
          data-minor-ticks="5"
          data-value="22.3"
          data-units="false"
        ></canvas>
      </div>
    );
  }
}

export default Multisensor;
