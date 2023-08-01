import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseSubCategorysComponent } from './disease-sub-categorys.component';

describe('DiseaseSubCategorysComponent', () => {
  let component: DiseaseSubCategorysComponent;
  let fixture: ComponentFixture<DiseaseSubCategorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseSubCategorysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiseaseSubCategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
