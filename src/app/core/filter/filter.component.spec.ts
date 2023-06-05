import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { FilterserviceService } from './filterservice.service';

describe('FilterComponent', () => {
  let service= new FilterserviceService();
  let filter = new FilterComponent(service);
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
