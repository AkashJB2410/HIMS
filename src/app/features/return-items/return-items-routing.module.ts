import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnItemsComponent } from './return-items.component';

const routes: Routes = [
  {path:'', component:ReturnItemsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnItemsRoutingModule { }
