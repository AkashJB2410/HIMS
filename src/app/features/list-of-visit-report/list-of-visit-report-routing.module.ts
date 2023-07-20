import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfVisitReportComponent } from './list-of-visit-report.component';

const routes: Routes = [
  {path:'', component:ListOfVisitReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOfVisitReportRoutingModule { }
