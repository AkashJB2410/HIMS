import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientConfigCountryComponent } from './patient-config-country.component';

const routes: Routes = [{path:'', component:PatientConfigCountryComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientConfigCountryRoutingModule { }
