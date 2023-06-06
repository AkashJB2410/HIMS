import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfVisitReportComponent } from './list-of-visit-report.component';

describe('ListOfVisitReportComponent', () => {
  let component: ListOfVisitReportComponent;
  let fixture: ComponentFixture<ListOfVisitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfVisitReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfVisitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
