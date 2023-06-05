import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacySaleReturnComponent } from './pharmacy-sale-return.component';

describe('PharmacySaleReturnComponent', () => {
  let component: PharmacySaleReturnComponent;
  let fixture: ComponentFixture<PharmacySaleReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacySaleReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacySaleReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
