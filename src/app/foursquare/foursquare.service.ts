import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';


@Injectable()
export class FoursquareService {

  constructor(public http: Http) { }

    getResults(venues: string) {
      let url = 'https://api.foursquare.com/v2/venues/search?client_id=0FUWIT0YHKX4U3O22GQP5N1KFJGPFW3C10QBCHYLSYP5NLD1&client_secret=EAUMMJFGWFRSICPULE2Q0XB1PR4L0YRNN35RAHQQUDUPTRWM&v=20130815&limit=5&ll=56.879,14.8059&query=' + venues;
      return this.http.get(url)
      		

}
