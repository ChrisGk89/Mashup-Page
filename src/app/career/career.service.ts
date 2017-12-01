import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';


@Injectable()
export class CareerService {

  constructor(public http: Http) { }

    getJobs(title: string) {
      let url = 'http://celtest1.lnu.se/mashup/php/CareerService.php?title=' + title;
      // let url = 'dist/php/CareerService.php?title=' + title;
      return this.http.get(url)
          .map((res: Response) => res.json());
    }

}
