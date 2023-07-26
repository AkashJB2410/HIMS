import { BankBranchMasterModule } from './features/bank-branch-master/bank-branch-master.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
//component import statements
import { MasterPageComponent } from './features/master-page/master-page.component';
import { SubModuleModule } from './features/master-management-modules/unit-config/sub-module/sub-module.module';
import { SubModuleComponent } from './features/master-management-modules/unit-config/sub-module/sub-module.component';
import { MasterModuleComponent } from './features/master-management-modules/unit-config/master-module/master-module.component';
import { MasterModuleModule } from './features/master-management-modules/unit-config/master-module/master-module.module';
import { RoleManagementModule } from './features/role-management/role-management.module';
import { OrganizationModule } from './features/master-management-modules/unit-config/organization/organizationModule';
import { RegistrationFormComponent } from './features/registration-form/registration-form.component';
import { RegistrationFormModule } from './features/registration-form/registration-form.module';
import { SharedModule } from './core/shared/modules/shared.module';
import { HomeComponent } from './features/home/home.component';
import { AllMastersComponent } from './features/master-management-modules/all-masters/all-masters.component';
import { CreateAbhaIdComponent } from './features/create-abha-id/create-abha-id.component';
import { BankBranchMasterComponent } from './features/bank-branch-master/bank-branch-master.component';
import { ActionButtonModule } from './features/action-button/action-button.module';
import { ActionModule } from './features/action-module/actionModule';
import { GroupModuleComponent } from './features/master-management-modules/unit-config/group-module/group-module.component';
import { LovTypeComponent } from './features/lov-type/lov-type.component';
import { LovValueComponent } from './features/lov-value/lov-value.component';
import { ConfigurationsComponent } from './features/configurations/configurations.component';
import { SelfRegistrationComponent } from './features/self-registration/self-registration.component';
import { ClusterComponent } from './features/cluster/cluster.component';
import { SpetialityComponent } from './features/spetiality/spetiality.component';
import { CoreFeaturesComponent } from './features/core-features/core-features.component';
import { OpdRegistrationComponent } from './features/opd-registration/opd-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterPageComponent,
    SubModuleComponent,
    MasterModuleComponent,
    RegistrationFormComponent,
    HomeComponent,
    AllMastersComponent,
    CreateAbhaIdComponent,
    BankBranchMasterComponent,
    GroupModuleComponent,
    LovTypeComponent,
    LovValueComponent,
    ConfigurationsComponent,
    SelfRegistrationComponent,
    ClusterComponent,
    SpetialityComponent,
    CoreFeaturesComponent,
    OpdRegistrationComponent,
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
    RegistrationFormModule,
    ActionButtonModule,
    ActionModule,
    BankBranchMasterModule

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
