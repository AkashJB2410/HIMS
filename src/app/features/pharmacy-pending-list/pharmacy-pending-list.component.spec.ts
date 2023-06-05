import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPendingListComponent } from './pharmacy-pending-list.component';

describe('PharmacyPendingListComponent', () => {
  let component: PharmacyPendingListComponent;
  let fixture: ComponentFixture<PharmacyPendingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyPendingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
