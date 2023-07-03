import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let filter = new FilterComponent();
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    filter = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(filter).toBeTruthy();
  });
});
