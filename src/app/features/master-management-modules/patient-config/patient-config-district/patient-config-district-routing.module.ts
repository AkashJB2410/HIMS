import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientConfigDistrictComponent } from './patient-config-district.component';

const routes: Routes = [{path:'', component:PatientConfigDistrictComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientConfigDistrictRoutingModule { }
