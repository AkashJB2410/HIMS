import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErPatientListComponent } from './er-patient-list.component';

const routes: Routes = [
  {path:'', component:ErPatientListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErPatientListRoutingModule { }
