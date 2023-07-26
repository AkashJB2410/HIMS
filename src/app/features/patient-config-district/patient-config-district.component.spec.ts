import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientConfigDistrictComponent } from './patient-config-district.component';

describe('PatientConfigDistrictComponent', () => {
  let component: PatientConfigDistrictComponent;
  let fixture: ComponentFixture<PatientConfigDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientConfigDistrictComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientConfigDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
