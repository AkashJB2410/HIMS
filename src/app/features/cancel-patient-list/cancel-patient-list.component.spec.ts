import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelPatientListComponent } from './cancel-patient-list.component';

describe('CancelPatientListComponent', () => {
  let component: CancelPatientListComponent;
  let fixture: ComponentFixture<CancelPatientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelPatientListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelPatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
