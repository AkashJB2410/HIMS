import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillRefundComponent } from './bill-refund.component';

const routes: Routes = [
  {path:'', component:BillRefundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRefundRoutingModule { }
