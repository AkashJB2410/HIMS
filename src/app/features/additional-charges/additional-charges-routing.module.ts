import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalChargesComponent } from './additional-charges.component';

const routes: Routes = [
  {path:'', component:AdditionalChargesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditionalChargesRoutingModule { }
