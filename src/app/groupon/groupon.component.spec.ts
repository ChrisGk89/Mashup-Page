/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GrouponComponent } from './groupon.component';

describe('GrouponComponent', () => {
  let component: GrouponComponent;
  let fixture: ComponentFixture<GrouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
