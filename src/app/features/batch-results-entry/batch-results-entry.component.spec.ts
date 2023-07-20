import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchResultsEntryComponent } from './batch-results-entry.component';

describe('BatchResultsEntryComponent', () => {
  let component: BatchResultsEntryComponent;
  let fixture: ComponentFixture<BatchResultsEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchResultsEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchResultsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
