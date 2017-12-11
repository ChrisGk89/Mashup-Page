/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FoursquareResultComponent } from './foursquare-result.component';

describe('FoursquareResultComponent', () => {
  let component: FoursquareResultComponent;
  let fixture: ComponentFixture<FoursquareResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoursquareResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoursquareResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
