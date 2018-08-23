export default class AssetService {  
  constructor(){
    this.name = 'SitesService';
    this.assetsUrl = 'http://192.168.107.101:8080/assets.json'; 
    this.assets = [];
    this.getAssetsList();
  }

  getAssetsList(){
    let that = this;
    fetch(this.assetsUrl)
    .then((resp) => {
      return resp.json()
    })
    .then(function(data) {      
      that.assets = data;
    });
  }

  getAssets(){
    return this.assets;
  }
}
