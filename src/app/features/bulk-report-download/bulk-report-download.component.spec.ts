import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkReportDownloadComponent } from './bulk-report-download.component';

describe('BulkReportDownloadComponent', () => {
  let component: BulkReportDownloadComponent;
  let fixture: ComponentFixture<BulkReportDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkReportDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkReportDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
