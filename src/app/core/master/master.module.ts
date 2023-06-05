import { NgModule } from '@angular/core';

import { MasterRoutingModule } from './master-routing.module';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    MasterRoutingModule,
    SharedModule
  ],
})

export class MasterModule { }
