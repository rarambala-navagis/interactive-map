import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Gmap from './Gmap';
import NavToolbar from './NavToolbar';
import Maphelper from './Maphelper';
import MapDataContainer from './MapDataContainer';
import Sites from '../sites/Sites';
import TrendingCharts from '../trending-charts/TrendingCharts';

export class MainPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  constructor(props){
    super(props);

    this.mapHelper = new Maphelper();
    this.mapDataContainer = new MapDataContainer();

    this.state = {
      zoom: 3,
      map:{},
      showSitesWindow: false,
      showChart: false
    }
  }

  setMapObject(map){
    this.setState({map: map});
    window.navmap = map;
  }

  showTrendingCharts(){
    this.setState({ showChart: true});
  }

  hideTrendingCharts(){
    this.setState({ showChart: false});
  }

  openSitesInfoWindow(){
    this.setState({showSitesWindow: true});
  }

  closeSitesInfoWindow(){
    this.setState({showSitesWindow: false});
  }

  render() {
    let toolbars = null;
    let sites = null;
    let charts = null;

    if(Object.keys(this.state.map).length){
       toolbars = (
         <NavToolbar showSites={this.openSitesInfoWindow.bind(this)} showCharts={this.showTrendingCharts.bind(this)}/>
       );

       sites = (<Sites mapDataContainer={this.mapDataContainer} 
                        isShown={this.state.showSitesWindow} 
                        closeWindow={this.closeSitesInfoWindow.bind(this)} 
                        showCharts={this.showTrendingCharts.bind(this)}
                        hideCharts={this.hideTrendingCharts.bind(this)}/>);

       charts = (<TrendingCharts isShown={this.state.showChart} 
                                closeWindow={this.hideTrendingCharts.bind(this)}/>);
    }
    return (
      <div>
        <Gmap setMapObject={this.setMapObject.bind(this)} zoom={this.state.zoom}/>
        {toolbars}
        {sites}
        {charts}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    gMap: state.gMap,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
