import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MasterPageComponent } from './features/master-page/master-page.component';
import { SubModuleModule } from './features/sub-module/sub-module.module';
import { SubModuleComponent } from './features/sub-module/sub-module.component';
import { MasterModuleComponent } from './features/master-module/master-module.component';
import { MasterModuleModule } from './features/master-module/master-module.module';
import { RoleManagementModule } from './features/role-management/role-management.module';
import { RoleManagementComponent } from './features/role-management/role-management.component';
import { OrganizationComponent } from './features/organization/organization.component';
import { OrganizationModule } from './features/organization/organizationModule';
import { RegistrationFormComponent } from './features/registration-form/registration-form.component';
import { RegistrationFormModule } from './features/registration-form/registration-form.module';
import { SharedModule } from './core/shared/modules/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    MasterPageComponent,
    SubModuleComponent,
    MasterModuleComponent,
    RoleManagementComponent,
    OrganizationComponent,
    RegistrationFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    SubModuleModule,
    MasterModuleModule,
    RoleManagementModule,
    OrganizationModule,
    RegistrationFormModule

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ConfirmationService,
    MessageService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
