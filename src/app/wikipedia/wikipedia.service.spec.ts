/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WikipediaService } from './wikipedia.service';

describe('Service: Wikipedia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WikipediaService]
    });
  });

  it('should ...', inject([WikipediaService], (service: WikipediaService) => {
    expect(service).toBeTruthy();
  }));
});
