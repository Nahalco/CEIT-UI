import React from 'react';
import Multisensor from './Multisensor.jsx';
import Mode from './Mode.jsx';
import Cooler from './Cooler.jsx';
import {I1820Client} from '@i1820/api';

import {version} from '../package.json';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.client = new I1820Client('http://iot.ceit.aut.ac.ir:58902');
    this.state = {
      agents: []
    };
  }

  componentDidMount() {
    this.client.discovery().then((agents) => {
      this.setState({
        agents
      });
    });
  }

  render() {
    let multisensor = (
      <div></div>
    );
    let modes = [];
    let cooler = (
      <div></div>
    );

    if (this.state.agents.length > 0) {
      multisensor = (
        <Multisensor thing={this.state.agents[0].getThingsByType('multisensor')[0]} />
      )

      cooler = (
        <Cooler thing={this.state.agents[0].getThingsByType('cooler')[0]} />
      )

      this.state.agents[0].getThingsByType('mode').forEach((mode, index) => {
        modes.push((<Mode thing={mode} key={index} />))
      });
    }
    return (
      <div>
        <div className="bg-info container-fluid row">
          <a href="http://aut.ac.ir/" className="col-2 text-center">
            <img src="img/aut.png" width="120" height="120" className="align-top" alt="AUT Logo" />
          </a>
          <h1 className="col-8 text-center mt-2 display-1">Meeting Room</h1>
          <a href="http://ceit.aut.ac.ir/" className="col-2 text-center">
            <img src="img/ceit.png" width="120" height="120" className="align-top" alt="CEIT Logo" />
          </a>
        </div>
        <div className="container mt-2">
          <div className="row">
            <div className="col-8">
              <h2>Scenarios</h2>
              <div className="card-deck">
                {modes}
              </div>
              <h2>Actuators</h2>
              <div className="card-deck">
                {cooler}
              </div>
            </div>
            <div className="col-4">
              {multisensor}
            </div>
          </div>
        </div>
        <div className="bg-info fixed-bottom container-fluid row">
          <div className="col-3">
            <p className="text-center">
              Aolab
            </p>
          </div>
          <div className="col-7">
            <p className="text-center">
              CEIT Department, Amirkabir University of Technology.
            </p>
          </div>
          <div className="col-2">
            <p className="text-center">
              Aolab-UI, {version}, &copy;{new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
