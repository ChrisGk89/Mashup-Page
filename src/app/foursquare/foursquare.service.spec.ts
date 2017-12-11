/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FoursquareService } from './foursquare.service';

describe('Service: Foursquare', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoursquareService]
    });
  });

  it('should ...', inject([FoursquareService], (service: FoursquareService) => {
    expect(service).toBeTruthy();
  }));
});
