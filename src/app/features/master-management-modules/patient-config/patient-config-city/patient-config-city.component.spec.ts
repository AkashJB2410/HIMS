import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientConfigCityComponent } from './patient-config-city.component';

describe('PatientConfigCityComponent', () => {
  let component: PatientConfigCityComponent;
  let fixture: ComponentFixture<PatientConfigCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientConfigCityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientConfigCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
