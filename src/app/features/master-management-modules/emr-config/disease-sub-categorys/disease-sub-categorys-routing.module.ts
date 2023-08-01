import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiseaseSubCategorysComponent } from './disease-sub-categorys.component';

const routes: Routes = [
  {
    path:'', component:DiseaseSubCategorysComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseSubCategorysRoutingModule { }
