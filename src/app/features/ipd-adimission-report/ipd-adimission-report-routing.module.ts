import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpdAdimissionReportComponent } from './ipd-adimission-report.component';

const routes: Routes = [
  {path:'', component:IpdAdimissionReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpdAdimissionReportRoutingModule { }
