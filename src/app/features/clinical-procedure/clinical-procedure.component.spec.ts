import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalProcedureComponent } from './clinical-procedure.component';

describe('ClinicalProcedureComponent', () => {
  let component: ClinicalProcedureComponent;
  let fixture: ComponentFixture<ClinicalProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalProcedureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
