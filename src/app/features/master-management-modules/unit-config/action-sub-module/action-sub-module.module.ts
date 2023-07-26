import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionSubModuleRoutingModule } from './action-sub-module-routing.module';
import { ActionSubModuleComponent } from './action-sub-module.component';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';



@NgModule({
  declarations: [
    ActionSubModuleComponent
  ],
  imports: [
    CommonModule,
    ActionSubModuleRoutingModule,
    SharedModule
  ]
})
export class ActionSubModuleModule { }
