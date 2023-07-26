import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicalProcedureRoutingModule } from './clinical-procedure-routing.module';
import { ClinicalFormsComponent } from '../clinical-forms/clinical-forms.component';
import { ClinicalProcedureComponent } from './clinical-procedure.component';


@NgModule({
  declarations: [
    ClinicalProcedureComponent
  ],
  imports: [
    CommonModule,
    ClinicalProcedureRoutingModule
  ]
})
export class ClinicalProcedureModule { }
