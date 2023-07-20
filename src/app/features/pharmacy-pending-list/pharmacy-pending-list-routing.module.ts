import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyPendingListComponent } from './pharmacy-pending-list.component';

const routes: Routes = [
  {path:'', component:PharmacyPendingListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyPendingListRoutingModule { }
