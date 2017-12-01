/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CareerService } from './career.service';

describe('Service: Career', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CareerService]
    });
  });

  it('should ...', inject([CareerService], (service: CareerService) => {
    expect(service).toBeTruthy();
  }));
});
