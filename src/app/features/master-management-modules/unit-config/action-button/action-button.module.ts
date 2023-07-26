import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonRoutingModule } from './actionButtonRouting.Module';
import { ActionButtonComponent } from './action-button.component';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';



@NgModule({
  declarations: [
    ActionButtonComponent
  ],
  imports: [
    CommonModule,
    ActionButtonRoutingModule,
    SharedModule
  ]
})
export class ActionButtonModule { }
