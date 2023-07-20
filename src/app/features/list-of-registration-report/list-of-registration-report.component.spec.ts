import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfRegistrationReportComponent } from './list-of-registration-report.component';

describe('ListOfRegistrationReportComponent', () => {
  let component: ListOfRegistrationReportComponent;
  let fixture: ComponentFixture<ListOfRegistrationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfRegistrationReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfRegistrationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
