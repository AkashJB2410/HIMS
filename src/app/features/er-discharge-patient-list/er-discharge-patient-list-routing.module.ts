import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErDischargePatientListComponent } from './er-discharge-patient-list.component';

const routes: Routes = [
  {path:'', component:ErDischargePatientListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErDischargePatientListRoutingModule { }
