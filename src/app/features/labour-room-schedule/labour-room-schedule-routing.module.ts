import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabourRoomScheduleComponent } from './labour-room-schedule.component';

const routes: Routes = [
  {path:'', component:LabourRoomScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabourRoomScheduleRoutingModule { }
