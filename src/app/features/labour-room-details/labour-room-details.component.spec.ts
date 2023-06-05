import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourRoomDetailsComponent } from './labour-room-details.component';

describe('LabourRoomDetailsComponent', () => {
  let component: LabourRoomDetailsComponent;
  let fixture: ComponentFixture<LabourRoomDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourRoomDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabourRoomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
