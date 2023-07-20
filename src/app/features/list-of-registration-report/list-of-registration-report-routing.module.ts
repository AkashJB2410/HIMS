import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfRegistrationReportComponent } from './list-of-registration-report.component';

const routes: Routes = [
  {path:'', component:ListOfRegistrationReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOfRegistrationReportRoutingModule { }
