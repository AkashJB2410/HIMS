import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyBillListComponent } from './pharmacy-bill-list.component';

describe('PharmacyBillListComponent', () => {
  let component: PharmacyBillListComponent;
  let fixture: ComponentFixture<PharmacyBillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyBillListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
