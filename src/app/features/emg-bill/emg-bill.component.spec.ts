import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmgBillComponent } from './emg-bill.component';

describe('EmgBillComponent', () => {
  let component: EmgBillComponent;
  let fixture: ComponentFixture<EmgBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmgBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmgBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
