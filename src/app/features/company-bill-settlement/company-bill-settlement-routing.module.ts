import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyBillSettlementComponent } from './company-bill-settlement.component';

const routes: Routes = [
  {path:'', component:CompanyBillSettlementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyBillSettlementRoutingModule { }
