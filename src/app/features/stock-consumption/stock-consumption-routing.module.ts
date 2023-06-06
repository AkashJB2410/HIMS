import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockConsumptionComponent } from './stock-consumption.component';

const routes: Routes = [
  {path:'', component:StockConsumptionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockConsumptionRoutingModule { }
