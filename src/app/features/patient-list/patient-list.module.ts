import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientListRoutingModule } from './patient-list-routing.module';
import { PatientListComponent } from './patient-list.component';


@NgModule({
  declarations: [
    PatientListComponent
  ],
  imports: [
    CommonModule,
    PatientListRoutingModule
  ]
})
export class PatientListModule { }
