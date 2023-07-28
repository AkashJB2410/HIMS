import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorScheduleComponent } from './doctor-schedule.component';

const routes: Routes = [{path:'', component:DoctorScheduleComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorScheduleRoutingModule { }
