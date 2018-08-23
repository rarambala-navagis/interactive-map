import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {GoogleApiWrapper} from 'google-maps-react';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  render() {
    return (
      <div className="home-app">
        <div className="page-container">{this.props.children}</div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBNJB5csj_STWghVQyohH68eTQ3OWZjdcE"
})(App)
