import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelledBillListComponent } from './cancelled-bill-list.component';

const routes: Routes = [
  {path:'', component:CancelledBillListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelledBillListRoutingModule { }
