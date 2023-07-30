import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMastersComponent } from './all-masters.component';

const routes: Routes = [
  {path:'', component:AllMastersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllMastersRoutingModule { }
