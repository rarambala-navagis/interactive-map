export default class Maphelper {
  constructor() {
    this.name = '';
  }

  //---------------------------------------------
  // MARKERS HELPER METHODS
  //---------------------------------------------
  
  createMarker(dataContainer,lat,lng,props){
      var tempLatlng = {lat: lat, lng: lng};
      var marker = new window.google.maps.Marker({
        uiid: props.id,
        position: tempLatlng,
        map: window.navmap,
        title: props.title,
        icon:props.icon
      });

      dataContainer.markers.push(marker);
  }

  setMarkerInfoWindow(dataContainer,marker_id,contentString){
    let marker = dataContainer.markers.filter( m => (m.uiid === marker_id))[0];
    marker.infoWindow = new window.google.maps.InfoWindow({
      content:contentString
    });
  }

  hideMarker(dataContainer,marker_id){
    let marker = dataContainer.markers.filter( m => (m.uiid === marker_id))[0];
    marker.setMap(null);
    marker = null;
  }

  showMarker(dataContainer,marker_id){
    let marker = dataContainer.markers.filter( m => (m.uiid === marker_id))[0];
    marker.setMap(window.navmap);
  }

  showAllMarkers(dataContainer){
      dataContainer.markers.map( m => { m.setMap(window.navmap); return m;});
  }

  hideAllMarkers(dataContainer){
    if(dataContainer && dataContainer.markers && dataContainer.markers.length > 0){
      dataContainer.markers.map( m => { m.setMap(null); return m;});
      dataContainer.markers = [];
    }
  }

  //---------------------------------------------
  // POLYGON HELPER METHODS
  //---------------------------------------------
  createPolygon(dataContainer,coordinates,props){
      // Construct the polygon.
      var polygon = new window.google.maps.Polygon({
        uiid: props.id,
        paths: coordinates,
        strokeColor: props.strokeColor,
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: props.fillColor,
        fillOpacity: 0.35
      });

      polygon.setMap(window.navmap);
      dataContainer.polygons.push(polygon);
  }

  hidePolygon(dataContainer,polygon_id){
    let polygon = dataContainer.polygons.filter( m => (m.uiid === polygon_id))[0];
    polygon.setMap(null);
    let newPolygons = [];
    for(var i=0; i < dataContainer.polygons.length; i++){
      if(dataContainer.polygons[i].uiid !== polygon_id){
        newPolygons.push(dataContainer.polygons[i]);
      }
    }
    dataContainer.polygons = newPolygons;
  }

  showAllPolygons(dataContainer){
      dataContainer.polygons.map( m => { m.setMap(window.navmap); return m;});
  }

  hideAllPolygons(dataContainer){
     dataContainer.polygons.map( m => { m.setMap(null); return m;});
     dataContainer.polygons = [];
  }

  getPolygonCenter(coordinates){
      var bounds = new window.google.maps.LatLngBounds();
      var i;
      
      var polygonCoords = [];
      for(i = 0; i < coordinates.length; i++){
        polygonCoords.push( new window.google.maps.LatLng(parseFloat(coordinates[i][1]), parseFloat(coordinates[i][0])));
      }
      
      for (i = 0; i < polygonCoords.length; i++) {
        bounds.extend(polygonCoords[i]);
      }

      return bounds.getCenter();
  }

  removeMarkerListeners(dataContainer){
    for (let i = 0; i < dataContainer.markerlisteners; i++) {
      window.google.maps.event.removeListener(dataContainer.markerlisteners[i]);
    }

    dataContainer.markerlisteners = [];
  }

  removeMapListeners(dataContainer){
    for (let i = 0; i < dataContainer.mapListeners; i++) {
      window.google.maps.event.removeListener(dataContainer.mapListeners[i]);
    }
    dataContainer.mapListeners = [];
  }

  removePolygonListeners(dataContainer){
    for (let i = 0; i < dataContainer.polygonListeners; i++) {
      window.google.maps.event.removeListener(dataContainer.polygonListeners[i]);
    }
    dataContainer.polygonListeners = [];
  }

  removeAllListeners(dataContainer){
    this.removeMarkerListeners(dataContainer);
    this.removeMapListeners(dataContainer);
    this.removePolygonListeners(dataContainer);
  }

  removeAllMarkers(dataContainer){
    for (let i = 0; i < dataContainer.markers.length; i++) {
      dataContainer.markers[i].setMap(null);
    }
    dataContainer.markers = [];
  }

  removeAllPolygons(dataContainer){
    for (let i = 0; i < dataContainer.polygons; i++) {
      dataContainer.polygons[i].setMap(null);
    }
    dataContainer.polygons = [];
  }

  cleanup(dataContainer){
    this.removeAllListeners(dataContainer);
    this.removeAllMarkers(dataContainer);
    this.removeAllPolygons(dataContainer);
  }
}
