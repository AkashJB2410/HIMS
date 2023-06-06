import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabReportsComponent } from './lab-reports.component';

const routes: Routes = [
  {path:'', component:LabReportsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabReportsRoutingModule { }
