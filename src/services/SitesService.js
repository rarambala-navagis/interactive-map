
export default class SitesService {
  constructor(){
    this.name = 'SitesService';
    this.sitesUrl = 'http://192.168.107.101:8080/sites.json';    
    this.sites = [];
    this.getSitesList();
  }

  getSitesList(){
    let that = this;
    fetch(this.sitesUrl)
    .then((resp) => {
      return resp.json()
    })
    .then(function(data) {      
      that.sites = data;
    });
  }

  getSites(){
    return this.sites;
  }
}
