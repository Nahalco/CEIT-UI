import React from 'react';


class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <img className="row img-thumbnail border-0" src="img/aut.png" alt="AUT Logo" />
          <img className="row img-thumbnail border-0" src="img/ceit.png" alt="CEIT Logo" />
          <img className="row img-thumbnail border-0" src="img/aolab.png" alt="Aolab Logo" />
        </div>
        <div className="col-6">
          <div className="mx-auto row">
            <h1 className="display-2">
              Meeting Room 
              <small className="text-muted h4">{new Date().getFullYear()}</small>
            </h1>
          </div>
          <div>
          </div>
        </div>
        <div className="col">
        </div>
      </div>
    );
  }
}

export default App;
