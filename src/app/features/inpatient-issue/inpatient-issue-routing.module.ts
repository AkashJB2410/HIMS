import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InpatientIssueComponent } from './inpatient-issue.component';

const routes: Routes = [
  {path:'', component:InpatientIssueComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InpatientIssueRoutingModule { }
