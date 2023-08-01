import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicalProceduresComponent } from './clinical-procedures.component';

const routes: Routes = [
  {
    path:'', component:ClinicalProceduresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicalProceduresRoutingModule { }
