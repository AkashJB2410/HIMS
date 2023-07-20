import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyBillEditComponent } from './pharmacy-bill-edit.component';

describe('PharmacyBillEditComponent', () => {
  let component: PharmacyBillEditComponent;
  let fixture: ComponentFixture<PharmacyBillEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyBillEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyBillEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
