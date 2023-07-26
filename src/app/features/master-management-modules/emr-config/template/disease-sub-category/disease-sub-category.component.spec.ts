import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseSubCategoryComponent } from './disease-sub-category.component';

describe('DiseaseSubCategoryComponent', () => {
  let component: DiseaseSubCategoryComponent;
  let fixture: ComponentFixture<DiseaseSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseSubCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiseaseSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
