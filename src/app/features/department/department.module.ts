import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentRoutingModule } from './department-routing.module';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule
  ]
})
export class DepartmentModule { }
