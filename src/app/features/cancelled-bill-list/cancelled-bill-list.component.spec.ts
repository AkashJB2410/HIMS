import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledBillListComponent } from './cancelled-bill-list.component';

describe('CancelledBillListComponent', () => {
  let component: CancelledBillListComponent;
  let fixture: ComponentFixture<CancelledBillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledBillListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelledBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
