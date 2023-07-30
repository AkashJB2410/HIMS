import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalFormsComponent } from './clinical-forms.component';

describe('ClinicalFormsComponent', () => {
  let component: ClinicalFormsComponent;
  let fixture: ComponentFixture<ClinicalFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
