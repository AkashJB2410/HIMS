import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IcdCodeRoutingModule } from './icd-code-routing.module';
import { IcdCodeComponent } from './icd-code.component';


@NgModule({
  declarations: [
    IcdCodeComponent
  ],
  imports: [
    CommonModule,
    IcdCodeRoutingModule
  ]
})
export class IcdCodeModule { }
