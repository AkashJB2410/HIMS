import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddChargesForNurseDoctorComponent } from './add-charges-for-nurse-doctor.component';

const routes: Routes = [
  {path:'', component:AddChargesForNurseDoctorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddChargesForNurseDoctorRoutingModule { }
