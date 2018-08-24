import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Maphelper from '../navmap/Maphelper';
import Site from './Site';

export class Sites extends Component {
  static propTypes = {
    sites: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props){
    super(props);

    this.maphelper = new Maphelper();

    this.state = {
        sites: [],
        hasLoadedSite: false,
        actions:{},
        showInfoWindow: false,
        infowindowData: {},
        siteDetailLocation:{},
        isShowAssets: false,
        activeSite: ''
    };
 
  }
  
  componentDidUnMount(){ 
    //clean up all the markers, polygons and listeners   
    let dataContainer = this.props.mapDataContainer;
    this.maphelper.cleanup(dataContainer);
  }

  loadSiteInMap(siteName){
    let sites = this.props.sitesService.getSites();
    let dataContainer = this.props.mapDataContainer;

    let site = sites.filter(s => s.name === siteName)[0];
    const tempCoordinates = [];

    for(var i = 0; i < site.coordinates.length; i++){
        tempCoordinates.push({ lat: parseFloat(site.coordinates[i][1]), lng: parseFloat(site.coordinates[i][0]) });
    }

    // Start Edit by Rex
    let center = site.center;
    let that = this;
    
    if(window.navmap.getZoom() <= 15){
      console.log('im creating marker..',site,center);

      this.maphelper.createMarker(dataContainer,center.lat,center.lng,{id: siteName,title: siteName,icon: "http://192.168.107.101:8080/asset_icons/marker.png"});
      this.maphelper.setCenterMarkers(dataContainer);
      //window.navmap.setZoom(3);

      //add the onclick listener
      let marker = dataContainer.markers.filter( m => (m.uiid === siteName))[0];

      dataContainer.markerListeners.push(marker.addListener('click', function(e) {  
        console.log(siteName);    
        that.setState({
          showInfoWindow: true,
          activeSite: siteName, 
          infowindowData: site.properties,
          siteDetailLocation: {position:"absolute", top:e.va.pageY, left: e.va.pageX}
        });
      }));

      console.log('after create marker', dataContainer);

    } else {

      this.maphelper.createPolygon(dataContainer,tempCoordinates,{id: siteName,strokeColor: "#FF0000",fillColor: "#FF0000"});
      window.navmap.setCenter(center);

      //window.navmap.setZoom(7);

      //add the onclick listener
      let polygon = dataContainer.polygons.filter( m => (m.uiid === siteName))[0];

      dataContainer.polygonListeners.push(polygon.addListener('click', function(e) {      
        that.setState({
          showInfoWindow: true, 
          infowindowData: site.properties,
          siteDetailLocation: {position:"absolute", top:e.va.pageY, left: e.va.pageX}
        });
      }));

    }

    // End Edit by Rex

    if(Object.keys(dataContainer.mapListeners).length === 0 ){
          /*dataContainer.mapListeners.push(window.navmap.addListener('click', function(){
              that.setState({
                showInfoWindow: false
              }); 
            }));*/
          // dataContainer.mapListeners.push(window.navmap.addListener('zoom_changed', function(){
            
          //   if(window.navmap.getZoom() >= 9){
          //     that.setState({
          //       isShowAssets: true,
          //       showInfoWindow: false
          //     });
          //   } else {
          //     that.setState({
          //       isShowAssets: false
          //     });
          //   }
          // }));
    }    
  }

  unloadSiteInMap(siteName){      
      let dataContainer = this.props.mapDataContainer;

      if(window.navmap.getZoom() <= 15){

        this.maphelper.removeAllMarkers(dataContainer);
      } else {

        this.maphelper.hidePolygon(dataContainer,siteName);
      }

      this.setState({
        showInfoWindow: false, 
        isShowAssets: false
      });
  }

  selectSite(e){
    let tempSite = e.target.getAttribute('site');

    if(e.target.checked){
      this.loadSiteInMap(tempSite);
    } else {
      this.unloadSiteInMap(tempSite);
    }
  }

  closeWindow(){
    let dataContainer = this.props.mapDataContainer;
    this.maphelper.hideAllPolygons(dataContainer);
    this.props.closeWindow();
  }

  showAssets(name){
    this.setState({ isShowAssets: true, activeSite: name, showInfoWindow: false});
  }

  closeSiteDetailsInfoWindow(){
      this.setState({showInfoWindow : false});
  }

  render() {
    let dataContainer = this.props.mapDataContainer;
    this.maphelper.cleanup(dataContainer);
    var sites = this.props.sitesService.getSites();
    let sitesList = sites.map((site,index)=> {

      return (
          <tr key={"sites" + index}><td><input type="checkbox" onChange={this.selectSite.bind(this)} site={site.name}/></td><td>{site.name}</td></tr>
      );
    });

    if(this.state.activeSite != ''){
      console.log('show al the markwers..');
      this.loadSiteInMap(this.state.activeSite);
    }

    if(this.props.isShown){
      return (
          <div className="sites-sites">
            <div className="panel panel-primary">
              <div className="panel-heading">Sites
              <button type="button" className="close" onClick={this.closeWindow.bind(this)}> 
                  <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                </button>          
              </div>
              <div className="panel-body">
                <table style={{width: "100%"}}>
                  <tbody>
                    {sitesList}
                  </tbody>
                </table>              
              </div>
            </div>
            <Site isShown={this.state.showInfoWindow} 
                  mapDataContainer={this.props.mapDataContainer}
                  site={this.state.infowindowData} 
                  location={this.state.siteDetailLocation}
                  showAssets={this.showAssets.bind(this)} 
                  isShowAssets={this.state.isShowAssets}
                  closeWindow={this.closeSiteDetailsInfoWindow.bind(this)} 
                  hideTrendingCharts={() => this.props.hideCharts()} 
                  showTrendingCharts={() => this.props.showCharts()} />
          </div>
        );
    }
    
    return null;
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    sites: state.sites,
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
)(Sites);
