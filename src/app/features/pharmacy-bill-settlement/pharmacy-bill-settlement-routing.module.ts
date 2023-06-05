import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyBillSettlementComponent } from './pharmacy-bill-settlement.component';

const routes: Routes = [
  {path:'', component:PharmacyBillSettlementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyBillSettlementRoutingModule { }
