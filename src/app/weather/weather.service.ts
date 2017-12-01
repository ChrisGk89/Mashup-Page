import { Injectable } from '@angular/core';

import { Http, Response} from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class WeatherService {

  constructor(public http: Http) {}

  getWheather() {
      let url = 'https://api.wunderground.com/api/d0de0338a0727f16/forecast/q/Sweden/vaxjo.json';
      return this.http.get(url)
            .map((res: Response) => res.json());
  }

}
