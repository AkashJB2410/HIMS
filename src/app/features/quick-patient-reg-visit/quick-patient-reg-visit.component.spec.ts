import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPatientRegVisitComponent } from './quick-patient-reg-visit.component';

describe('QuickPatientRegVisitComponent', () => {
  let component: QuickPatientRegVisitComponent;
  let fixture: ComponentFixture<QuickPatientRegVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickPatientRegVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickPatientRegVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
