import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionRoleRoutingModule } from './action-role-routing.module';
import { ActionRoleComponent } from './action-role.component';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';




@NgModule({
  declarations: [
    ActionRoleComponent
  ],
  imports: [
    CommonModule,
    ActionRoleRoutingModule,
    SharedModule
  ]
})
export class ActionRoleModule { }
