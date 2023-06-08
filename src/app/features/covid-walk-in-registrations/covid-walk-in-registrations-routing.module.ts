import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidWalkInRegistrationsComponent } from './covid-walk-in-registrations.component';

const routes: Routes = [
  {path:'', component:CovidWalkInRegistrationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovidWalkInRegistrationsRoutingModule { }
