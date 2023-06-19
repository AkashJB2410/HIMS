import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllMastersRoutingModule } from './all-masters-routing.module';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AllMastersRoutingModule,
    SharedModule
  ]
})
export class AllMastersModule { }
