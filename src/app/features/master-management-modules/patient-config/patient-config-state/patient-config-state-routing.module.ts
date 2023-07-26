import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientConfigStateComponent } from './patient-config-state.component';

const routes: Routes = [{path:'',component:PatientConfigStateComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientConfigStateRoutingModule { }
