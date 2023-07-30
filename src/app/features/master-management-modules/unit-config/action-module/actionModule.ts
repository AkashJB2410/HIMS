import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionRoutingModule } from './actionModule.Routing.Module';
import { ActionModuleComponent } from './action-module.component';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';


@NgModule({
  declarations: [
    ActionModuleComponent
  ],
  imports: [
    CommonModule,
    ActionRoutingModule,
    SharedModule
  ]
})
export class ActionModule { }