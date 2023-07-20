import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadiologyReportsComponent } from './radiology-reports.component';

const routes: Routes = [
  {path:'', component:RadiologyReportsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadiologyReportsRoutingModule { }
