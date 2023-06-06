import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacySalesReportComponent } from './pharmacy-sales-report.component';

const routes: Routes = [
  {path:'', component:PharmacySalesReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacySalesReportRoutingModule { }
