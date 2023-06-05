import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourRoomFinalizedListComponent } from './labour-room-finalized-list.component';

describe('LabourRoomFinalizedListComponent', () => {
  let component: LabourRoomFinalizedListComponent;
  let fixture: ComponentFixture<LabourRoomFinalizedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourRoomFinalizedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabourRoomFinalizedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
