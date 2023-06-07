import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidBillingSummaryComponent } from './covid-billing-summary.component';

const routes: Routes = [
  {path:'', component:CovidBillingSummaryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovidBillingSummaryRoutingModule { }
