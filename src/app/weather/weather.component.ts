import { Component, OnInit } from '@angular/core';

import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit {
  forecasts: Array<any> = [];
  constructor(public weatherService: WeatherService) {
  }
  ngOnInit() {
    this.weatherService.getWheather()
      .subscribe(
        data => {
          this.createWeatherForecasts(data);
        },
        err => console.error(err),
        () => console.log('done')
      );
  }
  createWeatherForecasts(data) {
    data = data.forecast.txt_forecast.forecastday;
    for (let i = 0; i < data.length; i += 2) { // +2 Are used to avoid printing of night weather.
      let dayStr = this.formatDay(data[i].title);
      let forecastObj = {day: dayStr, icon: data[i].icon_url, description: data[i].fcttext_metric};
      this.forecasts.push(forecastObj);
    }
  }
  formatDay(day) {
    let result = '';
    switch (day.toUpperCase()) {
      case 'MONDAY':
        result = 'Mon';
        break;
      case 'TUESDAY':
        result = 'Tue';
        break;
      case 'WEDNESDAY':
        result = 'Wed';
        break;
      case 'THURSDAY':
        result = 'Thu';
        break;
      case 'FRIDAY':
        result = 'Fri';
        break;
      case 'SATURDAY':
        result = 'Sat';
        break;
      case 'SUNDAY':
        result = 'Sun';
        break;
    }
    return result;
  }
}
