import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpdAdimissionReportComponent } from './ipd-adimission-report.component';

describe('IpdAdimissionReportComponent', () => {
  let component: IpdAdimissionReportComponent;
  let fixture: ComponentFixture<IpdAdimissionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpdAdimissionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpdAdimissionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
