import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickPatientRegVisitComponent } from './quick-patient-reg-visit.component';

const routes: Routes = [
  {path:'', component:QuickPatientRegVisitComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickPatientRegVisitRoutingModule { }
