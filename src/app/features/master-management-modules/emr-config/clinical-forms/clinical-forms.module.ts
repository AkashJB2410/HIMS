import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicalRoutingModule } from './clinical-forms-routing.module';
import { ClinicalFormsComponent } from './clinical-forms.component';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';


@NgModule({
  declarations: [
    ClinicalFormsComponent
  ],
  imports: [
    CommonModule,
    ClinicalRoutingModule,
    SharedModule
  ]
})
export class ClinicalModule { }
