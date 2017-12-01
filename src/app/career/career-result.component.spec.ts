/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CareerResultComponent } from './career-result.component';

describe('CareerResultComponent', () => {
  let component: CareerResultComponent;
  let fixture: ComponentFixture<CareerResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
