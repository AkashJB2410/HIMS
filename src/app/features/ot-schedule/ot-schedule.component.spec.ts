import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtScheduleComponent } from './ot-schedule.component';

describe('OtScheduleComponent', () => {
  let component: OtScheduleComponent;
  let fixture: ComponentFixture<OtScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
