import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtScheduleComponent } from './ot-schedule.component';

const routes: Routes = [
  {path:'', component:OtScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtScheduleRoutingModule { }
