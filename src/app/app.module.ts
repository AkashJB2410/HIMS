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
import { ErDischargePatientListComponent } from './features/er-discharge-patient-list/er-discharge-patient-list.component';
import { CancelPatientListComponent } from './features/cancel-patient-list/cancel-patient-list.component';
import { AllMastersComponent } from './features/all-masters/all-masters.component';
import { CreateAbhaIdComponent } from './features/create-abha-id/create-abha-id.component';
import { PatientsWaitingComponent } from './features/patients-waiting/patients-waiting.component';
import { TokenDisplayComponent } from './features/token-display/token-display.component';
import { QuickPatientRegVisitComponent } from './features/quick-patient-reg-visit/quick-patient-reg-visit.component';
import { QueueComponent } from './features/queue/queue.component';
import { AppointmentComponent } from './features/appointment/appointment.component';
import { AppointmentListComponent } from './features/appointment-list/appointment-list.component';
import { RegistrationComponent } from './features/registration/registration.component';
import { RegistrationListComponent } from './features/registration-list/registration-list.component';
import { OpdVisitListComponent } from './features/opd-visit-list/opd-visit-list.component';
import { FeedbackVisitListComponent } from './features/feedback-visit-list/feedback-visit-list.component';
import { ListOfRegistrationReportComponent } from './features/list-of-registration-report/list-of-registration-report.component';
import { ListOfVisitReportComponent } from './features/list-of-visit-report/list-of-visit-report.component';
import { HaspathalReportComponent } from './features/haspathal-report/haspathal-report.component';
import { IpdQuickRegistrationComponent } from './features/ipd-quick-registration/ipd-quick-registration.component';
import { DischargeComponent } from './features/discharge/discharge.component';
import { DischargeSummaryComponent } from './features/discharge-summary/discharge-summary.component';
import { OtScheduleComponent } from './features/ot-schedule/ot-schedule.component';
import { OtRequestComponent } from './features/ot-request/ot-request.component';
import { OtScheduleListComponent } from './features/ot-schedule-list/ot-schedule-list.component';
import { LabourRoomScheduleComponent } from './features/labour-room-schedule/labour-room-schedule.component';
import { LabourRoomRequestComponent } from './features/labour-room-request/labour-room-request.component';
import { LabourRoomDetailsComponent } from './features/labour-room-details/labour-room-details.component';
import { ScheduleListComponent } from './features/schedule-list/schedule-list.component';
import { LabourRoomFinalizedListComponent } from './features/labour-room-finalized-list/labour-room-finalized-list.component';
import { NursingConsoleComponent } from './features/nursing-console/nursing-console.component';
import { AddChargesForNurseDoctorComponent } from './features/add-charges-for-nurse-doctor/add-charges-for-nurse-doctor.component';
import { InpatientIssueComponent } from './features/inpatient-issue/inpatient-issue.component';
import { BillListComponent } from './features/bill-list/bill-list.component';
import { CancelledBillListComponent } from './features/cancelled-bill-list/cancelled-bill-list.component';
import { BillRefundComponent } from './features/bill-refund/bill-refund.component';
import { AdvanceComponent } from './features/advance/advance.component';
import { CompanyBillSettlementComponent } from './features/company-bill-settlement/company-bill-settlement.component';
import { OpeningBalanceComponent } from './features/opening-balance/opening-balance.component';
import { ItemEnquiryComponent } from './features/item-enquiry/item-enquiry.component';
import { QuotationComponent } from './features/quotation/quotation.component';
import { GeneratePoComponent } from './features/generate-po/generate-po.component';
import { GoodReceiveNoteComponent } from './features/good-receive-note/good-receive-note.component';
import { ReturnItemsComponent } from './features/return-items/return-items.component';
import { CurrentStockComponent } from './features/current-stock/current-stock.component';
import { StockConsumptionComponent } from './features/stock-consumption/stock-consumption.component';
import { AdjustStockComponent } from './features/adjust-stock/adjust-stock.component';
import { ScrapSaleComponent } from './features/scrap-sale/scrap-sale.component';
import { PharmacyPendingListComponent } from './features/pharmacy-pending-list/pharmacy-pending-list.component';
import { PharmacySaleComponent } from './features/pharmacy-sale/pharmacy-sale.component';
import { PharmacyBillListComponent } from './features/pharmacy-bill-list/pharmacy-bill-list.component';
import { PharmacyQueueComponent } from './features/pharmacy-queue/pharmacy-queue.component';
import { PharmacySaleReturnComponent } from './features/pharmacy-sale-return/pharmacy-sale-return.component';
import { PharmacyBillSettlementComponent } from './features/pharmacy-bill-settlement/pharmacy-bill-settlement.component';
import { PharmacyBillEditComponent } from './features/pharmacy-bill-edit/pharmacy-bill-edit.component';
import { NursingIndentComponent } from './features/nursing-indent/nursing-indent.component';
import { AmbulanceRequisitionComponent } from './features/ambulance-requisition/ambulance-requisition.component';
import { OpdApplicationFormComponent } from './features/opd-application-form/opd-application-form.component';
import { IpdApplicationFormComponent } from './features/ipd-application-form/ipd-application-form.component';
import { EmgApplicationFormComponent } from './features/emg-application-form/emg-application-form.component';
import { NewAdmissionRequestComponent } from './features/new-admission-request/new-admission-request.component';
import { ListOfAdmissionRequestComponent } from './features/list-of-admission-request/list-of-admission-request.component';
import { AdmissionListComponent } from './features/admission-list/admission-list.component';
import { DischargeListComponent } from './features/discharge-list/discharge-list.component';
import { AdmissionCancelListComponent } from './features/admission-cancel-list/admission-cancel-list.component';
import { BedTransferComponent } from './features/bed-transfer/bed-transfer.component';
import { UnderMaintenanceComponent } from './features/under-maintenance/under-maintenance.component';
import { GraphicalViewComponent } from './features/graphical-view/graphical-view.component';
import { IpdAdimissionReportComponent } from './features/ipd-adimission-report/ipd-adimission-report.component';
import { BirthCertificateComponent } from './features/birth-certificate/birth-certificate.component';
import { StillBirthCertificateComponent } from './features/still-birth-certificate/still-birth-certificate.component';
import { DeathCertificateComponent } from './features/death-certificate/death-certificate.component';
import { PostMortemCertificateComponent } from './features/post-mortem-certificate/post-mortem-certificate.component';
import { EmgBillComponent } from './features/emg-bill/emg-bill.component';
import { OpdBillComponent } from './features/opd-bill/opd-bill.component';
import { IpdChargesComponent } from './features/ipd-charges/ipd-charges.component';
import { IpdBillComponent } from './features/ipd-bill/ipd-bill.component';
import { LabOrderListComponent } from './features/lab-order-list/lab-order-list.component';
import { LabReportsComponent } from './features/lab-reports/lab-reports.component';
import { LabConsumptionReportComponent } from './features/lab-consumption-report/lab-consumption-report.component';
import { LabOrderComponent } from './features/lab-order/lab-order.component';
import { PacsComponent } from './features/pacs/pacs.component';
import { TransferComponent } from './features/transfer/transfer.component';
import { ReceiveComponent } from './features/receive/receive.component';
import { CurrentStockReportComponent } from './features/current-stock-report/current-stock-report.component';
import { PharmacySalesReportComponent } from './features/pharmacy-sales-report/pharmacy-sales-report.component';
import { RadiologyCofirmationComponent } from './features/radiology-cofirmation/radiology-cofirmation.component';
import { QuickRadiologyConfirmationComponent } from './features/quick-radiology-confirmation/quick-radiology-confirmation.component';
import { AdditionalChargesComponent } from './features/additional-charges/additional-charges.component';
import { RadiologyReportsComponent } from './features/radiology-reports/radiology-reports.component';
import { ResultsUpdateComponent } from './features/results-update/results-update.component';
import { DispatchGovtComponent } from './features/dispatch-govt/dispatch-govt.component';
import { CashFlowComponent } from './features/cash-flow/cash-flow.component';
import { BatchListComponent } from './features/batch-list/batch-list.component';
import { BatchResultsEntryComponent } from './features/batch-results-entry/batch-results-entry.component';
import { QaApprovalComponent } from './features/qa-approval/qa-approval.component';
import { BulkReportDownloadComponent } from './features/bulk-report-download/bulk-report-download.component';
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
import { CountryComponent } from './features/country/country.component';
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
    ErDischargePatientListComponent,
    CancelPatientListComponent,
    AllMastersComponent,
    CreateAbhaIdComponent,
    PatientsWaitingComponent,
    TokenDisplayComponent,
    QuickPatientRegVisitComponent,
    QueueComponent,
    AppointmentComponent,
    AppointmentListComponent,
    RegistrationComponent,
    RegistrationListComponent,
    OpdVisitListComponent,
    FeedbackVisitListComponent,
    ListOfRegistrationReportComponent,
    ListOfVisitReportComponent,
    HaspathalReportComponent,
    IpdQuickRegistrationComponent,
    DischargeComponent,
    DischargeSummaryComponent,
    OtScheduleComponent,
    OtRequestComponent,
    OtScheduleListComponent,
    LabourRoomScheduleComponent,
    LabourRoomRequestComponent,
    LabourRoomDetailsComponent,
    ScheduleListComponent,
    LabourRoomFinalizedListComponent,
    NursingConsoleComponent,
    AddChargesForNurseDoctorComponent,
    InpatientIssueComponent,
    BillListComponent,
    CancelledBillListComponent,
    BillRefundComponent,
    AdvanceComponent,
    CompanyBillSettlementComponent,
    OpeningBalanceComponent,
    ItemEnquiryComponent,
    QuotationComponent,
    GeneratePoComponent,
    GoodReceiveNoteComponent,
    ReturnItemsComponent,
    CurrentStockComponent,
    StockConsumptionComponent,
    AdjustStockComponent,
    ScrapSaleComponent,
    PharmacyPendingListComponent,
    PharmacySaleComponent,
    PharmacyBillListComponent,
    PharmacyQueueComponent,
    PharmacySaleReturnComponent,
    PharmacyBillSettlementComponent,
    PharmacyBillEditComponent,
    NursingIndentComponent,
    AmbulanceRequisitionComponent,
    OpdApplicationFormComponent,
    IpdApplicationFormComponent,
    EmgApplicationFormComponent,
    NewAdmissionRequestComponent,
    ListOfAdmissionRequestComponent,
    AdmissionListComponent,
    DischargeListComponent,
    AdmissionCancelListComponent,
    BedTransferComponent,
    UnderMaintenanceComponent,
    GraphicalViewComponent,
    IpdAdimissionReportComponent,
    BirthCertificateComponent,
    StillBirthCertificateComponent,
    DeathCertificateComponent,
    PostMortemCertificateComponent,
    EmgBillComponent,
    OpdBillComponent,
    IpdChargesComponent,
    IpdBillComponent,
    LabOrderListComponent,
    LabReportsComponent,
    LabConsumptionReportComponent,
    LabOrderComponent,
    PacsComponent,
    TransferComponent,
    ReceiveComponent,
    CurrentStockReportComponent,
    PharmacySalesReportComponent,
    RadiologyCofirmationComponent,
    QuickRadiologyConfirmationComponent,
    AdditionalChargesComponent,
    RadiologyReportsComponent,
    ResultsUpdateComponent,
    DispatchGovtComponent,
    CashFlowComponent,
    BatchListComponent,
    BatchResultsEntryComponent,
    QaApprovalComponent,
    BulkReportDownloadComponent,
    BankBranchMasterComponent,
    BedTransferComponent,
    GroupModuleComponent,
    LovTypeComponent,
    LovValueComponent,
    ConfigurationsComponent,
    SelfRegistrationComponent,
    ClusterComponent,
    SpetialityComponent,
    CoreFeaturesComponent,
    CountryComponent,
    
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
