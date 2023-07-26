import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organizationRoutingModule';
import { SharedModule } from 'src/app/core/shared/modules/shared.module';
import { OrganizationComponent } from './organization.component';


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