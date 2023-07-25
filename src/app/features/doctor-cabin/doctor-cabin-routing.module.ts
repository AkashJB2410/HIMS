import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorCabinComponent } from './doctor-cabin.component';

const routes: Routes = [
  {path:'', component:DoctorCabinComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorCabinRoutingModule { }
