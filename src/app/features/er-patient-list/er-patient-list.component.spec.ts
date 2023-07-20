import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErPatientListComponent } from './er-patient-list.component';

describe('ErPatientListComponent', () => {
  let component: ErPatientListComponent;
  let fixture: ComponentFixture<ErPatientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErPatientListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErPatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
