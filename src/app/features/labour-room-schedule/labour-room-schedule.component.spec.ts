import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourRoomScheduleComponent } from './labour-room-schedule.component';

describe('LabourRoomScheduleComponent', () => {
  let component: LabourRoomScheduleComponent;
  let fixture: ComponentFixture<LabourRoomScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourRoomScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabourRoomScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
