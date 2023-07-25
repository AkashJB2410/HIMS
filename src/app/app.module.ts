import { BankBranchMasterModule } from './features/bank-branch-master/bank-branch-master.module';
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
import { OrganizationModule } from './features/organization/organizationModule';
import { RegistrationFormComponent } from './features/registration-form/registration-form.component';
import { RegistrationFormModule } from './features/registration-form/registration-form.module';
import { SharedModule } from './core/shared/modules/shared.module';
import { HomeComponent } from './features/home/home.component';
import { EmergencyQuickRegistrationComponent } from './features/emergency-quick-registration/emergency-quick-registration.component';
import { ErPatientListComponent } from './features/er-patient-list/er-patient-list.component';
import { AllMastersComponent } from './features/all-masters/all-masters.component';
import { CreateAbhaIdComponent } from './features/create-abha-id/create-abha-id.component';
import { QuickPatientRegVisitComponent } from './features/quick-patient-reg-visit/quick-patient-reg-visit.component';
import { FeedbackVisitListComponent } from './features/feedback-visit-list/feedback-visit-list.component';
import { ListOfVisitReportComponent } from './features/list-of-visit-report/list-of-visit-report.component';
import { CurrentStockComponent } from './features/current-stock/current-stock.component';
import { AmbulanceRequisitionComponent } from './features/ambulance-requisition/ambulance-requisition.component';
import { OpdApplicationFormComponent } from './features/opd-application-form/opd-application-form.component';
import { IpdApplicationFormComponent } from './features/ipd-application-form/ipd-application-form.component';
import { BirthCertificateComponent } from './features/birth-certificate/birth-certificate.component';
import { StillBirthCertificateComponent } from './features/still-birth-certificate/still-birth-certificate.component';
import { DeathCertificateComponent } from './features/death-certificate/death-certificate.component';
import { PostMortemCertificateComponent } from './features/post-mortem-certificate/post-mortem-certificate.component';
import { IpdBillComponent } from './features/ipd-bill/ipd-bill.component';
import { LabOrderListComponent } from './features/lab-order-list/lab-order-list.component';
import { LabConsumptionReportComponent } from './features/lab-consumption-report/lab-consumption-report.component';
import { LabOrderComponent } from './features/lab-order/lab-order.component';
import { PacsComponent } from './features/pacs/pacs.component';
import { TransferComponent } from './features/transfer/transfer.component';
import { ReceiveComponent } from './features/receive/receive.component';
import { RadiologyCofirmationComponent } from './features/radiology-cofirmation/radiology-cofirmation.component';
import { QuickRadiologyConfirmationComponent } from './features/quick-radiology-confirmation/quick-radiology-confirmation.component';
import { AdditionalChargesComponent } from './features/additional-charges/additional-charges.component';
import { RadiologyReportsComponent } from './features/radiology-reports/radiology-reports.component';
import { ResultsUpdateComponent } from './features/results-update/results-update.component';
import { BankBranchMasterComponent } from './features/bank-branch-master/bank-branch-master.component';
import { ActionButtonModule } from './features/action-button/action-button.module';
import { ActionModule } from './features/action-module/actionModule';
import { GroupModuleComponent } from './features/group-module/group-module.component';
import { LovTypeComponent } from './features/lov-type/lov-type.component';
import { LovValueComponent } from './features/lov-value/lov-value.component';
import { ConfigurationsComponent } from './features/configurations/configurations.component';
import { SelfRegistrationComponent } from './features/self-registration/self-registration.component';
import { ClusterComponent } from './features/cluster/cluster.component';
import { SpetialityComponent } from './features/spetiality/spetiality.component';
import { CoreFeaturesComponent } from './features/core-features/core-features.component';
import { ManageStaffComponent } from './features/manage-staff/manage-staff.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterPageComponent,
    SubModuleComponent,
    MasterModuleComponent,
    RegistrationFormComponent,
    HomeComponent,
    EmergencyQuickRegistrationComponent,
    ErPatientListComponent,
    AllMastersComponent,
    CreateAbhaIdComponent,
    QuickPatientRegVisitComponent,
    FeedbackVisitListComponent,
    ListOfVisitReportComponent,
    CurrentStockComponent,
    AmbulanceRequisitionComponent,
    OpdApplicationFormComponent,
    IpdApplicationFormComponent,
    BirthCertificateComponent,
    StillBirthCertificateComponent,
    DeathCertificateComponent,
    PostMortemCertificateComponent,
    IpdBillComponent,
    LabOrderListComponent,
    LabConsumptionReportComponent,
    LabOrderComponent,
    PacsComponent,
    TransferComponent,
    ReceiveComponent,
    RadiologyCofirmationComponent,
    QuickRadiologyConfirmationComponent,
    AdditionalChargesComponent,
    RadiologyReportsComponent,
    ResultsUpdateComponent,
    BankBranchMasterComponent,
    GroupModuleComponent,
    LovTypeComponent,
    LovValueComponent,
    ConfigurationsComponent,
    SelfRegistrationComponent,
    ClusterComponent,
    SpetialityComponent,
    CoreFeaturesComponent,
    ManageStaffComponent,
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
