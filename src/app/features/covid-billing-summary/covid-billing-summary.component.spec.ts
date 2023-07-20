import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidBillingSummaryComponent } from './covid-billing-summary.component';

describe('CovidBillingSummaryComponent', () => {
  let component: CovidBillingSummaryComponent;
  let fixture: ComponentFixture<CovidBillingSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidBillingSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidBillingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
