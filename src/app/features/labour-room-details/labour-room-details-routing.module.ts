import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabourRoomDetailsComponent } from './labour-room-details.component';

const routes: Routes = [
  {path:'', component:LabourRoomDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabourRoomDetailsRoutingModule { }
