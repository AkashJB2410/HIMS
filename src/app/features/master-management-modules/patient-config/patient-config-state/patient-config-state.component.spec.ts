import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientConfigStateComponent } from './patient-config-state.component';

describe('PatientConfigStateComponent', () => {
  let component: PatientConfigStateComponent;
  let fixture: ComponentFixture<PatientConfigStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientConfigStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientConfigStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
