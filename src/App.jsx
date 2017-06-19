import React from 'react';
import Multisensor from './Multisensor.jsx';
import Mode from './Mode.jsx';
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
    return (
      <div>
        <div className="bg-warning container-fluid row">
          <a href="http://aut.ac.ir/" className="col-2 text-center">
            <img src="img/aut.png" width="50" height="50" className="align-top" alt="AUT Logo" />
          </a>
          <h1 className="col-8 text-center mt-2">Meeting Room</h1>
          <a href="http://ceit.aut.ac.ir/" className="col-2 text-center">
            <img src="img/ceit.png" width="50" height="50" className="align-top" alt="CEIT Logo" />
          </a>
        </div>
        <div className="container mt-2">
          <div className="row">
            <div className="col-8">
              <div className="card-group">
                <Mode title="Presentation" />
              </div>
            </div>
            <div className="col-4">
              <Multisensor />
            </div>
          </div>
        </div>
        <div className="bg-warning fixed-bottom container-fluid row">
          <address className="col-3">
            Aolab, Computer &amp; Information Technology Engineering Department,
            Amirkabir University of Technology,
            Tehran, Iran.
          </address>
          <div className="col-7">
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
