import React from 'react';

class Mode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">{this.props.title}</h4>
          <div className="btn-group" data-toggle="buttons">
            <label className="btn btn-primary active">
              <input type="checkbox" defaultChecked autoComplete="off" /> On
            </label>
            <label className="btn btn-primary">
              <input type="checkbox" autoComplete="off" /> Off
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Mode
