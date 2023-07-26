import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientConfigCityComponent } from '../patient-config-city/patient-config-city.component';
import { PatientConfigVillageComponent } from './patient-config-village.component';

const routes: Routes = [{path:'',component:PatientConfigVillageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientConfigVillageRoutingModule { }
