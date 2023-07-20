import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyBillListComponent } from './pharmacy-bill-list.component';

const routes: Routes = [
  {path:'', component:PharmacyBillListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyBillListRoutingModule { }
