import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourRoomRequestComponent } from './labour-room-request.component';

describe('LabourRoomRequestComponent', () => {
  let component: LabourRoomRequestComponent;
  let fixture: ComponentFixture<LabourRoomRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourRoomRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabourRoomRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
