import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicalProcedureComponent } from './clinical-procedure.component';

const routes: Routes = [
  {
    path:"", component:ClinicalProcedureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicalProcedureRoutingModule { }
