import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

export class Gmap extends Component {
  constructor(props){
    super(props);

    this.listeners = [];
    this.markers = [];

    this.state = {
      zoom: props.zoom
    }
  }

  onMapReady(mapProps, map){
    this.props.setMapObject(map);
  }

  render() {
    return (
      <div>
          <Map google={this.props.google} zoom={this.state.zoom} onReady={this.onMapReady.bind(this)}>  
           </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBNJB5csj_STWghVQyohH68eTQ3OWZjdcE"
})(Gmap);
