import React from 'react';
import Multisensor from './Multisensor.jsx';
import Mode from './Mode.jsx';


class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="col">
        <div className="row">
          <h1 className="display-2 col text-center">
            Meeting Room 
            <small className="text-muted h4">{new Date().getFullYear()}</small>
          </h1>
        </div>
        <div className="row">
          <div className="col-2">
            <img className="row img-thumbnail border-0" src="img/aut.png" alt="AUT Logo" />
            <img className="row img-thumbnail border-0" src="img/ceit.png" alt="CEIT Logo" />
            <img className="row img-thumbnail border-0" src="img/aolab.png" alt="Aolab Logo" />
          </div>
          <div className="col-8">
            <div className="card-group">
              <Mode title="Presentation" />
            </div>
          </div>
          <div className="col-2">
            <Multisensor />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
