import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyQueueComponent } from './pharmacy-queue.component';

const routes: Routes = [
  {path:'', component:PharmacyQueueComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyQueueRoutingModule { }
