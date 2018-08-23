import React, { Component } from 'react';

export default class NavToolbar extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="nav-map-nav-toolbar">
        <div className="btn-group">
          <button type="button" className="btn btn-default" onClick={() => this.props.showSites()}>
            <span className="glyphicon glyphicon-map-marker"></span> Sites
          </button>
          <button type="button" className="btn btn-default" onClick={() => this.props.showCharts()}>
            <span className="glyphicon glyphicon-stats"></span> Charts
          </button>  
        </div>      
      </div>
    );
  }
}
