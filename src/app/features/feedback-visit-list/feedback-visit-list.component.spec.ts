import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackVisitListComponent } from './feedback-visit-list.component';

describe('FeedbackVisitListComponent', () => {
  let component: FeedbackVisitListComponent;
  let fixture: ComponentFixture<FeedbackVisitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackVisitListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackVisitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
