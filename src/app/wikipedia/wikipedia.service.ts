import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';


@Injectable()
export class WikipediaService {

  constructor(public http: Http) { }

    getResults(title: string) {
      let url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srlimit=5&srsearch=' + title;
      //console.log(url);
      return this.http.get(url)
      		

}
