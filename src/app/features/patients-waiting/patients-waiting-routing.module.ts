import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from '../patient-list/patient-list.component';
import { PatientsWaitingComponent } from './patients-waiting.component';

const routes: Routes = [
  {path:'', component:PatientsWaitingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsWaitingRoutingModule { }
