import { Component, OnInit } from '@angular/core';

import { FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  DEFAULT_MAP_ZOOM = 12;
  DEFAULT_MAP_LAT = 56.8770413;
  DEFAULT_MAP_LNG = 14.8092744;

  markers: Array<any> = [];

  constructor(public flickrService: FlickrService) {
  }

  ngOnInit() {
    this.initFlickr();
  }

  initFlickr() {
    let args:Object = {text: 'växjö', per_page: 100,has_geo: true};
    this.flickrService.search(args)
    .subscribe((response) => {
        let responseData = this.parseFlickrResponse(response['_body']);
        let items = responseData.photos.photo;

        for (let item of items){
          this.getLocationFromPhotos(item,item.id);}
        },
        error => console.error(error)
        )
	}

  getLocationFromPhotos(item,id) {
      this.flickrService.getLocation(id)
          .subscribe((response)=>{
              let responseData = this.parseFlickrResponse(response['_body']);
              let photos = responseData.photo;

              this.appendToMap(item,responseData);
          },
          error => console.error(error)
        )
  }
  

  parseFlickrResponse(responseData){
      responseData = responseData.replace('jsonFlickrApi(', '');
      responseData = responseData.replace('})', '}');
      responseData = responseData.replace(/\\'/g, "'");

      return JSON.parse(responseData);
  }

  appendToMap(item,geoInfo){
      let lati = Number(geoInfo.photo.location.latitude);
      let langi =  Number(geoInfo.photo.location.longitude);
      let imgSrc = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_q.jpg";

      let marker = {lat:lati,lang:langi,title:item.title,img:imgSrc};
      this.markers.push(marker);
  }
}
