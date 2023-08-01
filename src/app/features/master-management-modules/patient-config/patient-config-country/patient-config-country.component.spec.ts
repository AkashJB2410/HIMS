import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientConfigCountryComponent } from './patient-config-country.component';

describe('PatientConfigCountryComponent', () => {
  let component: PatientConfigCountryComponent;
  let fixture: ComponentFixture<PatientConfigCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientConfigCountryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientConfigCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
