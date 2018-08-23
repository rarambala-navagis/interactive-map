import React, { Component } from 'react';
import AssetService from '../../services/AssetService';
import Maphelper from '../navmap/Maphelper';

export default class Site extends Component {
  static propTypes = {

  };
  constructor(props){
    super(props);
    this.assetService = new AssetService();
    this.maphelper = new Maphelper();

    this.state = {
        name:props.site.name,
        maintenance_cost: props.site.maintenance_cost,
        location: props.site.maintenance_cost,
        windowLocation: props.location
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
        name:nextProps.site.name,
        maintenance_cost: nextProps.site.maintenance_cost,
        location: nextProps.site.location,
        windowLocation: nextProps.location
     });
  }

  hideAssets(){
    let mapDataContainer = this.props.mapDataContainer;
    this.maphelper.hideAllMarkers(mapDataContainer);
  }

  showAssets(){
    let mapDataContainer = this.props.mapDataContainer;

    let assets = this.assetService.getAssets();
    let site = assets.filter(s => s.name === this.props.site.name)[0];
    let siteAssets = (site && site.assets) ? site.assets : [];
    let iconType = '';
    var contentString = '';

    for(var i in siteAssets){
      iconType = parseInt(Math.random() * (9 - 1) + 1);

      this.maphelper.createMarker(mapDataContainer,siteAssets[i].lat,siteAssets[i].lng,
                  {
                    id: siteAssets[i].name,
                    title: siteAssets[i].name,
                    icon: 'http://192.168.107.101:8080/asset_icons/' + iconType + '.png'
                  });
      
      contentString = "<div style='float:left'><img src='http://i.stack.imgur.com/g672i.png'></div><div style='float:right; padding: 10px;'><b>"+ siteAssets[i].name +"</b><br/>Latitude: " + siteAssets[i].lat + "<br/> Longitude: "+ siteAssets[i].lng +"</div>";
      this.maphelper.setMarkerInfoWindow(mapDataContainer,siteAssets[i].name,contentString)

      let marker = mapDataContainer.markers.filter(m => (m.uiid === (siteAssets[i].name)))[0];
      marker.addListener('click', function(){
        mapDataContainer.markers.map( (m) => {
            m.infoWindow.close();
            return null;
        });
        this.infoWindow.open(window.navmap,this);
      });
    } 
    window.navmap.setZoom(10);   
  }

  render() {
    let pixelLocation = this.props.location;
    if(this.props.isShowAssets){      
       this.showAssets();
    } else {
       this.hideAssets();
    }   

    if(this.props.isShown){
      
      return (
        <div className="sites-site" style={pixelLocation}>
          <div className="panel panel-primary">
            <div className="panel-heading">Site Details
            <button type="button" className="close" onClick={() => this.props.closeWindow()}> 
              <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
            </button>
            </div>
              <div className="panel-body">
                  <table style={{ 'width': "100%"}}>
                    <tbody> 
                      <tr>
                        <td><label>Name</label></td>
                        <td>{this.state.name}</td>
                      </tr>
                      <tr>
                          <td><label>Maintenance Cost</label></td>
                          <td>{'  '}${this.state.maintenance_cost}</td>
                      </tr>
                      <tr>
                          <td><label>Address</label></td>
                          <td>{this.state.location}</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
              <div style={{ float: "left"}}><button type="button" className="btn btn-link" onClick={() => this.props.showAssets(this.props.site.name)}>Show Assets</button>
              </div>
              <div><button type="button" className="btn btn-link" onClick={() => this.props.showTrendingCharts()}>Trending Chart</button>
              </div>            
          </div>
        </div>
      );
    }

    return null;
  }
}
