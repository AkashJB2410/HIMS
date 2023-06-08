import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidWalkInSearchComponent } from './covid-walk-in-search.component';

const routes: Routes = [
  {path:'', component:CovidWalkInSearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovidWalkInSearchRoutingModule { }
