import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';


@Injectable()
export class SearchService {

  constructor(public http: Http) { }

    getResults(title: string) {
      let url = 'spotify:artist:2o5jDhtHVPhrJdv3cEQ99Z' + title;
      //console.log(url);
      return this.http.get(url)
      		

}
