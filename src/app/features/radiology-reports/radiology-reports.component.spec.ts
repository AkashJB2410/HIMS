import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologyReportsComponent } from './radiology-reports.component';

describe('RadiologyReportsComponent', () => {
  let component: RadiologyReportsComponent;
  let fixture: ComponentFixture<RadiologyReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiologyReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiologyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
