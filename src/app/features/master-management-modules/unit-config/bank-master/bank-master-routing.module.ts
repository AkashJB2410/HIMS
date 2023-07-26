import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankMasterComponent } from './bank-master.component';

const routes: Routes = [
  {path:'', component:BankMasterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankMasterRoutingModule { }
