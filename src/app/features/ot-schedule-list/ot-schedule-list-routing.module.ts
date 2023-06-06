import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtScheduleListComponent } from './ot-schedule-list.component';

const routes: Routes = [
  {path:'', component:OtScheduleListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtScheduleListRoutingModule { }
