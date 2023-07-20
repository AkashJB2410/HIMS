import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpatientIssueComponent } from './inpatient-issue.component';

describe('InpatientIssueComponent', () => {
  let component: InpatientIssueComponent;
  let fixture: ComponentFixture<InpatientIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpatientIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InpatientIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
