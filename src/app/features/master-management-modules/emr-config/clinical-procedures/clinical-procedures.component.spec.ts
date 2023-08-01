import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalProceduresComponent } from './clinical-procedures.component';

describe('ClinicalProceduresComponent', () => {
  let component: ClinicalProceduresComponent;
  let fixture: ComponentFixture<ClinicalProceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalProceduresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
