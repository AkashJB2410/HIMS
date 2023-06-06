import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStockReportComponent } from './current-stock-report.component';

describe('CurrentStockReportComponent', () => {
  let component: CurrentStockReportComponent;
  let fixture: ComponentFixture<CurrentStockReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentStockReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
