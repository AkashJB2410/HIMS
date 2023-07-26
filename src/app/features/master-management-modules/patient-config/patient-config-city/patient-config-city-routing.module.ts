import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientConfigCityComponent } from './patient-config-city.component';

const routes: Routes = [{path:'',component:PatientConfigCityComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientConfigCityRoutingModule { }
