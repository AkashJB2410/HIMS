import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankBranchMasterComponent } from './bank-branch-master.component';
const routes: Routes = [
  {path:'',component:BankBranchMasterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankBranchMasterModule { }
