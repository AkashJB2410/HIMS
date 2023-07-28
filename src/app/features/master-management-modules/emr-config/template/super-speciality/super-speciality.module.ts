import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperSpecialityRoutingModule } from './super-speciality-routing.module';
import { SuperSpecialityComponent } from './super-speciality.component';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';


@NgModule({
  declarations: [
    SuperSpecialityComponent
  ],
  imports: [
    CommonModule,
    SuperSpecialityRoutingModule,
    SharedModule
  ]
})
export class SuperSpecialityModule { }
