import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtScheduleListComponent } from './ot-schedule-list.component';

describe('OtScheduleListComponent', () => {
  let component: OtScheduleListComponent;
  let fixture: ComponentFixture<OtScheduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtScheduleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
