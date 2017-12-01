/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompareService } from './compare.service';

describe('Service: Compare', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompareService]
    });
  });

  it('should ...', inject([CompareService], (service: CompareService) => {
    expect(service).toBeTruthy();
  }));
});
