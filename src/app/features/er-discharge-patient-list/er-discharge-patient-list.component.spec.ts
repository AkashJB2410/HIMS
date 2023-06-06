import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErDischargePatientListComponent } from './er-discharge-patient-list.component';

describe('ErDischargePatientListComponent', () => {
  let component: ErDischargePatientListComponent;
  let fixture: ComponentFixture<ErDischargePatientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErDischargePatientListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErDischargePatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
