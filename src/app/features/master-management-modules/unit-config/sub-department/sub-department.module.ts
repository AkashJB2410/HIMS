import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubDepartmentRoutingModule } from './sub-department-routing.module';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';
import { SubDepartmentComponent } from './sub-department.component';

@NgModule({
  declarations: [
    SubDepartmentComponent
  ],
  imports: [
    CommonModule,
    SubDepartmentRoutingModule,
    SharedModule
  ]
})
export class SubDepartmentModule { }
