import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankMasterRoutingModule } from './bank-master-routing.module';
import { BankMasterComponent } from './bank-master.component';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';



@NgModule({
  declarations: [
    BankMasterComponent
  ],
  imports: [
    CommonModule,
    BankMasterRoutingModule,
    SharedModule
  ]
})
export class BankMasterModule { }
