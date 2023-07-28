import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCabinComponent } from './doctor-cabin.component';

describe('DoctorCabinComponent', () => {
  let component: DoctorCabinComponent;
  let fixture: ComponentFixture<DoctorCabinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCabinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCabinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
