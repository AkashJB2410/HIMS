import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organizationRoutingModule';
import { OrganizationComponent } from './organization.component';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';




@NgModule({
  declarations: [
    OrganizationComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    SharedModule

  ]
})
export class OrganizationModule { }