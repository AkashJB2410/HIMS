import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayMasterComponent } from './day-master.component';

const routes: Routes = [
  {path:'', component:DayMasterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayMasterRoutingModule { }
