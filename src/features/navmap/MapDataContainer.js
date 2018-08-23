export default class MapDataContainer {
  constructor(){
    this.markers = [];
    this.polygons = [];
    this.infowindows = [];
    this.markerListeners = [];
    this.mapListeners = [];
    this.polygonListeners = []
  }
}
