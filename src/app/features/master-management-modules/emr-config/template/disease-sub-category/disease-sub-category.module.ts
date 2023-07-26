import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseaseRoutingModule } from './disease-sub-category-routing.module';
import { DiseaseSubCategoryComponent } from './disease-sub-category.component';


@NgModule({
  declarations: [
    DiseaseSubCategoryComponent
  ],
  imports: [
    CommonModule,
    DiseaseRoutingModule
  ]
})
export class DiseaseModule { }
