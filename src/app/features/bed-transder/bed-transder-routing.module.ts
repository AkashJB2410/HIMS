import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BedTransderComponent } from './bed-transder.component';

const routes: Routes = [
  {path:'', component:BedTransderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BedTransderRoutingModule { }
