import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentStockReportComponent } from './current-stock-report.component';

const routes: Routes = [
  {path:'', component:CurrentStockReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentStockReportRoutingModule { }
