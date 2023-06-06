import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabOrderComponent } from './lab-order.component';

const routes: Routes = [
  {path:'', component:LabOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabOrderRoutingModule { }
