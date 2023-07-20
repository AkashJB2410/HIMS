import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabConsumptionReportComponent } from './lab-consumption-report.component';

describe('LabConsumptionReportComponent', () => {
  let component: LabConsumptionReportComponent;
  let fixture: ComponentFixture<LabConsumptionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabConsumptionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabConsumptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
