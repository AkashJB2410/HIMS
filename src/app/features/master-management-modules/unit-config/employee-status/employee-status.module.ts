import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeStatusRoutingModule } from './employee-status-routing.module';
import { EmployeeStatusComponent } from './employee-status.component';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';



@NgModule({
  declarations: [
    EmployeeStatusComponent
  ],
  imports: [
    CommonModule,
    EmployeeStatusRoutingModule,
    SharedModule
  ]
})
export class EmployeeStatusModule { }
