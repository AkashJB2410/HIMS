import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelPatientListComponent } from './cancel-patient-list.component';

const routes: Routes = [
  {path:'', component:CancelPatientListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelPatientListRoutingModule { }
