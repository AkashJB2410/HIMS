import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacySaleComponent } from './pharmacy-sale.component';

const routes: Routes = [
  {path:'', component:PharmacySaleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacySaleRoutingModule { }
