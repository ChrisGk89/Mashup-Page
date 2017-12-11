/**
 * Loads all the modules, Components and services used in app.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';


import { AppComponent } from './app.component';

import { MapComponent } from './map/map.component';
import { WeatherComponent } from './weather/weather.component';
import { CompareComponent } from './compare/compare.component';
import { CompareResultComponent } from './compare/compare-result.component';

import { FlickrService } from './services/flickr.service';
import { WeatherService } from './weather/weather.service';
import { CompareService } from './compare/compare.service';
import { CareerService } from './career/career.service';
import { WikipediaService } from './wikipedia/wikipedia.service';
import { GrouponService } from './groupon/groupon.service';
import { FoursquareService } from './foursquare/foursquare.service';


import { DatepickerModule } from 'angular2-material-datepicker';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { CareerComponent } from './career/career.component';
import { CareerResultComponent } from './career/career-result.component';
import { WikipediaComponent } from './wikipedia/wikipedia.component';
import { WikipediaResultComponent } from './wikipedia/wikipedia-result.component';
import { FoursquareComponent } from './foursquare/foursquare.component';
import { FoursquareResultComponent } from './foursquare/foursquare-result.component';
import { SpotifyComponent } from './spotify/spotify.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    WeatherComponent,
    CompareComponent,
    CompareResultComponent,
    WikipediaComponent,
    WikipediaResultComponent,
    CareerComponent,
    CareerResultComponent,
    FoursquareComponent,
    FoursquareResultComponent,
    SpotifyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DatepickerModule,
    HttpModule,
    JsonpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDs0WJS-0UQ8F3N-8qhxyPXDniFVmS0uHQ'
    })
  ],
  providers: [WeatherService, FlickrService, CompareService, CareerService, WikipediaService, FoursquareService ],
  entryComponents: [AppComponent, CompareResultComponent, CareerResultComponent, WikipediaResultComponent, FoursquareResultComponent,],
  bootstrap: [AppComponent]
})
export class AppModule { }
