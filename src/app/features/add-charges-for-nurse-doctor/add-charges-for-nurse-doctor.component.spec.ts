import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChargesForNurseDoctorComponent } from './add-charges-for-nurse-doctor.component';

describe('AddChargesForNurseDoctorComponent', () => {
  let component: AddChargesForNurseDoctorComponent;
  let fixture: ComponentFixture<AddChargesForNurseDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChargesForNurseDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChargesForNurseDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
