import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBillSettlementComponent } from './company-bill-settlement.component';

describe('CompanyBillSettlementComponent', () => {
  let component: CompanyBillSettlementComponent;
  let fixture: ComponentFixture<CompanyBillSettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyBillSettlementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyBillSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
