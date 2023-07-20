import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdjustStockComponent } from './adjust-stock.component';

const routes: Routes = [
  {path:'', component:AdjustStockComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdjustStockRoutingModule { }
