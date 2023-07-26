import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientConfigVillageComponent } from './patient-config-village.component';

describe('PatientConfigVillageComponent', () => {
  let component: PatientConfigVillageComponent;
  let fixture: ComponentFixture<PatientConfigVillageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientConfigVillageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientConfigVillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
