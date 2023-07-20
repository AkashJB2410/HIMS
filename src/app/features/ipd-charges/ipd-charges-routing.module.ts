import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpdChargesComponent } from './ipd-charges.component';

const routes: Routes = [
  {path:'', component:IpdChargesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpdChargesRoutingModule { }
