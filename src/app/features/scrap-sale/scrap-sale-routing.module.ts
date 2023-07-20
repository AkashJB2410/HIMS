import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrapSaleComponent } from './scrap-sale.component';

const routes: Routes = [
  {path:'', component:ScrapSaleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrapSaleRoutingModule { }
