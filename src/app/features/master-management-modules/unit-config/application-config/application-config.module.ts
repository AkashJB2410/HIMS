import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationConfigRoutingModule } from './application-config-routing.module';
import { ApplicationConfigComponent } from './application-config.component';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';



@NgModule({
  declarations: [
    ApplicationConfigComponent
  ],
  imports: [
    CommonModule,
    ApplicationConfigRoutingModule,
    SharedModule
  ]
})
export class ApplicationConfigModule { }
