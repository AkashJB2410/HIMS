import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyBillSettlementComponent } from './pharmacy-bill-settlement.component';

describe('PharmacyBillSettlementComponent', () => {
  let component: PharmacyBillSettlementComponent;
  let fixture: ComponentFixture<PharmacyBillSettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyBillSettlementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyBillSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
