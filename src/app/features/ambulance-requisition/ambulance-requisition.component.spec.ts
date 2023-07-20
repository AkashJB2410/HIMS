import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceRequisitionComponent } from './ambulance-requisition.component';

describe('AmbulanceRequisitionComponent', () => {
  let component: AmbulanceRequisitionComponent;
  let fixture: ComponentFixture<AmbulanceRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbulanceRequisitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmbulanceRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
