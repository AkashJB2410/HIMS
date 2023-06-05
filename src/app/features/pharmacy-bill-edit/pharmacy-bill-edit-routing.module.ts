import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyBillEditComponent } from './pharmacy-bill-edit.component';

const routes: Routes = [
  {path:'', component:PharmacyBillEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyBillEditRoutingModule { }
