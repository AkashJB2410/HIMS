import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabourRoomRequestComponent } from './labour-room-request.component';

const routes: Routes = [
  {path:'', component:LabourRoomRequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabourRoomRequestRoutingModule { }
