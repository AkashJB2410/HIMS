import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabOrderListComponent } from './lab-order-list.component';

const routes: Routes = [
  {path:'', component:LabOrderListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabOrderListRoutingModule { }
