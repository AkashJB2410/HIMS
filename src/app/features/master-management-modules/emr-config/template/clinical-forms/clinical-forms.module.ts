import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicalRoutingModule } from './clinical-forms-routing.module';
import { ClinicalFormsComponent } from './clinical-forms.component';


@NgModule({
  declarations: [
    ClinicalFormsComponent
  ],
  imports: [
    CommonModule,
    ClinicalRoutingModule
  ]
})
export class ClinicalModule { }
