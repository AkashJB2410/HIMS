import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabConsumptionReportComponent } from './lab-consumption-report.component';

const routes: Routes = [
  {path:'', component:LabConsumptionReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabConsumptionReportRoutingModule { }
