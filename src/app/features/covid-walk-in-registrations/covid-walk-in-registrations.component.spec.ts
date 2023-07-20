import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidWalkInRegistrationsComponent } from './covid-walk-in-registrations.component';

describe('CovidWalkInRegistrationsComponent', () => {
  let component: CovidWalkInRegistrationsComponent;
  let fixture: ComponentFixture<CovidWalkInRegistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidWalkInRegistrationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidWalkInRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
