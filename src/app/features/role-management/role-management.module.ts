import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { RoleManagementComponent } from './role-management.component';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';



@NgModule({
  declarations: [
    RoleManagementComponent
  ],
  imports: [
    CommonModule,
    RoleManagementRoutingModule,
    SharedModule
  ]
})
export class RoleManagementModule { }
