import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiseaseSubCategoryComponent } from './disease-sub-category.component';

const routes: Routes = [
  {
    path:"", component:DiseaseSubCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseRoutingModule { }
