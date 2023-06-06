import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DischargeListComponent } from './discharge-list.component';

const routes: Routes = [
  {path:'', component:DischargeListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DischargeListRoutingModule { }
