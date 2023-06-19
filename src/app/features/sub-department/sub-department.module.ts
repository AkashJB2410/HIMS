import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubDepartmentRoutingModule } from './sub-department-routing.module';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SubDepartmentRoutingModule,
    SharedModule
  ]
})
export class SubDepartmentModule { }
