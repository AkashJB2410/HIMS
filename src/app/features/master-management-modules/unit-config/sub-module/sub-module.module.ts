import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubModuleRoutingModule } from './sub-module-routing.module';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SubModuleRoutingModule,
    SharedModule
  ]
})
export class SubModuleModule { }
