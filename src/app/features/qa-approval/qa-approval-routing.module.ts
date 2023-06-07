import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QaApprovalComponent } from './qa-approval.component';

const routes: Routes = [
  {path:'', component:QaApprovalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QaApprovalRoutingModule { }
