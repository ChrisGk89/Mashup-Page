import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';

@Injectable()
export class CompareService {
  constructor(public http: Http) { }
  getDate(day, month, year, town) {
    // let url = 'http://localhost/~janosch/php/CompareService.php?day=' + day + '&month=' + month + '&year=' + year + '&town=' + town;
    let url = 'http://celtest1.lnu.se/mashup/php/CompareService.php?day=' + day + '&month=' + month + '&year=' + year + '&town=' + town;
    // let url = 'dist/php/CompareService.php?day=' + day + '&month=' + month + '&year=' + year + '&town=' + town;
    console.log(url);
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
}
