import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterPageComponent } from './master-page.component';

const routes: Routes = [
  {
    path: '', component: MasterPageComponent,
    children: [
      { path: 'all-masters/role-management', loadChildren: () => import('./../role-management/role-management.module').then(m => m.RoleManagementModule) },
      { path: 'master-module', loadChildren: () => import('./../master-module/master-module.module').then(m => m.MasterModuleModule) },
      { path: 'sub-module', loadChildren: () => import('./../sub-module/sub-module.module').then(m => m.SubModuleModule) },
      { path: 'all-masters/organization', loadChildren: () => import('./../organization/organizationModule').then(m => m.OrganizationModule) },
      { path: 'registration-form', loadChildren: () => import('./../registration-form/registration-form.module').then(m => m.RegistrationFormModule) },
      { path: 'home', loadChildren: () => import('./../home/home.module').then(m => m.HomeModule) },
      { path: 'emergency-quick-registration', loadChildren: () => import('./../emergency-quick-registration/emergency-quick-registration.module').then(m => m.EmergencyQuickRegistrationModule) },
      { path: 'er-patient-list', loadChildren: () => import('./../er-patient-list/er-patient-list.module').then(m => m.ErPatientListModule) },
      { path: 'er-discharge-patient-list', loadChildren: () => import('./../er-discharge-patient-list/er-discharge-patient-list.module').then(m => m.ErDischargePatientListModule) },
      { path: 'cancel-patient-list', loadChildren: () => import('./../cancel-patient-list/cancel-patient-list.module').then(m => m.CancelPatientListModule) },
      { path: 'all-masters', loadChildren: () => import('./../all-masters/all-masters.module').then(m => m.AllMastersModule) },
      { path: 'create-abha-id', loadChildren: () => import('./../create-abha-id/create-abha-id.module').then(m => m.CreateAbhaIdModule) },
      { path: 'patient-list', loadChildren: () => import('./../patient-list/patient-list.module').then(m => m.PatientListModule) },
      { path: 'patients-waiting', loadChildren: () => import('./../patients-waiting/patients-waiting.module').then(m => m.PatientsWaitingModule) },
      { path: 'token-display', loadChildren: () => import('./../token-display/token-display.module').then(m => m.TokenDisplayModule) },
      { path: 'quick-patient-reg-visit', loadChildren: () => import('./../quick-patient-reg-visit/quick-patient-reg-visit.module').then(m => m.QuickPatientRegVisitModule) },
      { path: 'queue', loadChildren: () => import('./../queue/queue.module').then(m => m.QueueModule) },
      { path: 'appointment', loadChildren: () => import('./../appointment/appointment.module').then(m => m.AppointmentModule) },
      { path: 'appointment-list', loadChildren: () => import('./../appointment-list/appointment-list.module').then(m => m.AppointmentListModule) },
      { path: 'registration', loadChildren: () => import('./../registration/registration.module').then(m => m.RegistrationModule) },
      { path: 'registration-list', loadChildren: () => import('./../registration-list/registration-list.module').then(m => m.RegistrationListModule) },
      { path: 'opd-visit-list', loadChildren: () => import('./../opd-visit-list/opd-visit-list.module').then(m => m.OpdVisitListModule) },
      { path: 'feedback-visit-list', loadChildren: () => import('./../feedback-visit-list/feedback-visit-list.module').then(m => m.FeedbackVisitListModule) },
      { path: 'list-of-registration-report', loadChildren: () => import('./../list-of-registration-report/list-of-registration-report.module').then(m => m.ListOfRegistrationReportModule) },
      { path: 'list-of-visit-report', loadChildren: () => import('./../list-of-visit-report/list-of-visit-report.module').then(m => m.ListOfVisitReportModule) },
      { path: 'haspathal-report', loadChildren: () => import('./../haspathal-report/haspathal-report.module').then(m => m.HaspathalReportModule) },
      { path: 'ipd-quick-registration', loadChildren: () => import('./../ipd-quick-registration/ipd-quick-registration.module').then(m => m.IpdQuickRegistrationModule) },
      { path: 'discharge', loadChildren: () => import('./../discharge/discharge.module').then(m => m.DischargeModule) },
      { path: 'discharge-summary', loadChildren: () => import('./../discharge-summary/discharge-summary.module').then(m => m.DischargeSummaryModule) },
      { path: 'ot-schedule', loadChildren: () => import('./../ot-schedule/ot-schedule.module').then(m => m.OtScheduleModule) },
      { path: 'ot-request', loadChildren: () => import('./../ot-request/ot-request.module').then(m => m.OtRequestModule) },
      { path: 'ot-schedule-list', loadChildren: () => import('./../ot-schedule-list/ot-schedule-list.module').then(m => m.OtScheduleListModule) },
      { path: 'labour-room-request', loadChildren: () => import('./../labour-room-request/labour-room-request.module').then(m => m.LabourRoomRequestModule) },
      { path: 'labour-room-schedule', loadChildren: () => import('./../labour-room-schedule/labour-room-schedule.module').then(m => m.LabourRoomScheduleModule) },
      { path: 'labour-room-details', loadChildren: () => import('./../labour-room-details/labour-room-details.module').then(m => m.LabourRoomDetailsModule) },
      { path: 'schedule-list', loadChildren: () => import('./../schedule-list/schedule-list.module').then(m => m.ScheduleListModule) },
      { path: 'labour-room-finalized-list', loadChildren: () => import('./../labour-room-finalized-list/labour-room-finalized-list.module').then(m => m.LabourRoomFinalizedListModule) },
      { path: 'nursing-console', loadChildren: () => import('./../nursing-console/nursing-console.module').then(m => m.NursingConsoleModule) },
      { path: 'add-charges-for-nurse-doctor', loadChildren: () => import('./../add-charges-for-nurse-doctor/add-charges-for-nurse-doctor.module').then(m => m.AddChargesForNurseDoctorModule) },
      { path: 'inpatient-issue', loadChildren: () => import('./../inpatient-issue/inpatient-issue.module').then(m => m.InpatientIssueModule) },
      { path: 'bill-list', loadChildren: () => import('./../bill-list/bill-list.module').then(m => m.BillListModule) },
      { path: 'cancelled-bill-list', loadChildren: () => import('./../cancelled-bill-list/cancelled-bill-list.module').then(m => m.CancelledBillListModule) },
      { path: 'bill-refund', loadChildren: () => import('./../bill-refund/bill-refund.module').then(m => m.BillRefundModule) },
      { path: 'advance', loadChildren: () => import('./../advance/advance.module').then(m => m.AdvanceModule) },
      { path: 'company-bill-settlement', loadChildren: () => import('./../company-bill-settlement/company-bill-settlement.module').then(m => m.CompanyBillSettlementModule) },
      { path: 'opening-balance', loadChildren: () => import('./../opening-balance/opening-balance.module').then(m => m.OpeningBalanceModule) },
      { path: 'item-enquiry', loadChildren: () => import('./../item-enquiry/item-enquiry.module').then(m => m.ItemEnquiryModule) },
      { path: 'quotation', loadChildren: () => import('./../quotation/quotation.module').then(m => m.QuotationModule) },
      { path: 'generate-po', loadChildren: () => import('./../generate-po/generate-po.module').then(m => m.GeneratePoModule) },
      { path: 'good-receive-note', loadChildren: () => import('./../good-receive-note/good-receive-note.module').then(m => m.GoodReceiveNoteModule) },
      { path: 'return-items', loadChildren: () => import('./../return-items/return-items.module').then(m => m.ReturnItemsModule) },
      { path: 'current-stock', loadChildren: () => import('./../current-stock/current-stock.module').then(m => m.CurrentStockModule) },
      { path: 'stock-consumption', loadChildren: () => import('./../stock-consumption/stock-consumption.module').then(m => m.StockConsumptionModule) },
      { path: 'adjust-stock', loadChildren: () => import('./../adjust-stock/adjust-stock.module').then(m => m.AdjustStockModule) },
      { path: 'scrap-sale', loadChildren: () => import('./../scrap-sale/scrap-sale.module').then(m => m.ScrapSaleModule) },
      { path: 'pharmacy-pending-list', loadChildren: () => import('./../pharmacy-pending-list/pharmacy-pending-list.module').then(m => m.PharmacyPendingListModule) },
      { path: 'pharmacy-sale', loadChildren: () => import('./../pharmacy-sale/pharmacy-sale.module').then(m => m.PharmacySaleModule) },
      { path: 'pharmacy-bill-list', loadChildren: () => import('./../pharmacy-bill-list/pharmacy-bill-list.module').then(m => m.PharmacyBillListModule) },
      { path: 'pharmacy-queue', loadChildren: () => import('./../pharmacy-queue/pharmacy-queue.module').then(m => m.PharmacyQueueModule) },
      { path: 'pharmacy-sale-return', loadChildren: () => import('./../pharmacy-sale-return/pharmacy-sale-return.module').then(m => m.PharmacySaleReturnModule) },
      { path: 'pharmacy-bill-settlement', loadChildren: () => import('./../pharmacy-bill-settlement/pharmacy-bill-settlement.module').then(m => m.PharmacyBillSettlementModule) },
      { path: 'pharmacy-bill-edit', loadChildren: () => import('./../pharmacy-bill-edit/pharmacy-bill-edit.module').then(m => m.PharmacyBillEditModule) },
      { path: 'nursing-indent', loadChildren: () => import('./../nursing-indent/nursing-indent.module').then(m => m.NursingIndentModule) },
      { path: 'ambulance-requisition', loadChildren: () => import('./../ambulance-requisition/ambulance-requisition.module').then(m => m.AmbulanceRequisitionModule) },
      { path: 'opd-application-form', loadChildren: () => import('./../opd-application-form/opd-application-form.module').then(m => m.OpdApplicationFormModule) },
      { path: 'ipd-application-form', loadChildren: () => import('./../ipd-application-form/ipd-application-form.module').then(m => m.IpdApplicationFormModule) },
      { path: 'emg-application-form', loadChildren: () => import('./../emg-application-form/emg-application-form.module').then(m => m.EmgApplicationFormModule) },
      { path: 'new-admission-request', loadChildren: () => import('./../new-admission-request/new-admission-request.module').then(m => m.NewAdmissionRequestModule) },
      { path: 'list-of-admission-request', loadChildren: () => import('./../list-of-admission-request/list-of-admission-request.module').then(m => m.ListOfAdmissionRequestModule) },
      { path: 'admission-list', loadChildren: () => import('./../admission-list/admission-list.module').then(m => m.AdmissionListModule) },
      { path: 'discharge-list', loadChildren: () => import('./../discharge-list/discharge-list.module').then(m => m.DischargeListModule) },
      { path: 'admission-cancel-list', loadChildren: () => import('./../admission-cancel-list/admission-cancel-list.module').then(m => m.AdmissionCancelListModule) },
      { path: 'bed-transfer', loadChildren: () => import('../bed-transfer/bed-transfer.module').then(m => m.BedTransferModule) },
      { path: 'under-maintenance', loadChildren: () => import('./../under-maintenance/under-maintenance.module').then(m => m.UnderMaintenanceModule) },
      { path: 'graphical-view', loadChildren: () => import('./../graphical-view/graphical-view.module').then(m => m.GraphicalViewModule) },
      { path: 'ipd-admission-report', loadChildren: () => import('./../ipd-adimission-report/ipd-adimission-report.module').then(m => m.IpdAdimissionReportModule) },
      { path: 'birth-certificate', loadChildren: () => import('./../birth-certificate/birth-certificate.module').then(m => m.BirthCertificateModule) },
      { path: 'still-birth-certificate', loadChildren: () => import('./../still-birth-certificate/still-birth-certificate.module').then(m => m.StillBirthCertificateModule) },
      { path: 'death-certificate', loadChildren: () => import('./../death-certificate/death-certificate.module').then(m => m.DeathCertificateModule) },
      { path: 'post-mortem-certificate', loadChildren: () => import('./../post-mortem-certificate/post-mortem-certificate.module').then(m => m.PostMortemCertificateModule) },
      { path: 'emg-bill', loadChildren: () => import('./../emg-bill/emg-bill.module').then(m => m.EmgBillModule) },
      { path: 'opd-bill', loadChildren: () => import('./../opd-bill/opd-bill.module').then(m => m.OpdBillModule) },
      { path: 'ipd-charges', loadChildren: () => import('./../ipd-charges/ipd-charges.module').then(m => m.IpdChargesModule) },
      { path: 'ipd-bill', loadChildren: () => import('./../ipd-bill/ipd-bill.module').then(m => m.IpdBillModule) },
      { path: 'lab-order-list', loadChildren: () => import('./../lab-order-list/lab-order-list.module').then(m => m.LabOrderListModule) },
      { path: 'lab-reports', loadChildren: () => import('./../lab-reports/lab-reports.module').then(m => m.LabReportsModule) },
      { path: 'lab-consumption-report', loadChildren: () => import('./../lab-consumption-report/lab-consumption-report.module').then(m => m.LabConsumptionReportModule) },
      { path: 'lab-order', loadChildren: () => import('./../lab-order/lab-order.module').then(m => m.LabOrderModule) },
      { path: 'pacs', loadChildren: () => import('./../pacs/pacs.module').then(m => m.PacsModule) },
      { path: 'requisition', loadChildren: () => import('./../requisition/requisition.module').then(m => m.RequisitionModule) },
      { path: 'transfer', loadChildren: () => import('./../transfer/transfer.module').then(m => m.TransferModule) },
      { path: 'receive', loadChildren: () => import('./../receive/receive.module').then(m => m.ReceiveModule) },
      { path: 'current-stock-report', loadChildren: () => import('./../current-stock-report/current-stock-report.module').then(m => m.CurrentStockReportModule) },
      { path: 'pharmacy-sales-report', loadChildren: () => import('./../pharmacy-sales-report/pharmacy-sales-report.module').then(m => m.PharmacySalesReportModule) },
      { path: 'radiology-confirmation', loadChildren: () => import('./../radiology-cofirmation/radiology-cofirmation.module').then(m => m.RadiologyCofirmationModule) },
      { path: 'quick-radiology-confirmation', loadChildren: () => import('./../quick-radiology-confirmation/quick-radiology-confirmation.module').then(m => m.QuickRadiologyConfirmationModule) },
      { path: 'additional-charges', loadChildren: () => import('./../additional-charges/additional-charges.module').then(m => m.AdditionalChargesModule) },
      { path: 'radiology-reports', loadChildren: () => import('./../radiology-reports/radiology-reports.module').then(m => m.RadiologyReportsModule) },
      { path: 'results-update', loadChildren: () => import('./../results-update/results-update.module').then(m => m.ResultsUpdateModule) },
      { path: 'dispatch-govt', loadChildren: () => import('./../dispatch-govt/dispatch-govt.module').then(m => m.DispatchGovtModule) },
      { path: 'covid-billing-summary', loadChildren: () => import('./../covid-billing-summary/covid-billing-summary.module').then(m => m.CovidBillingSummaryModule) },
      { path: 'cash-flow', loadChildren: () => import('./../cash-flow/cash-flow.module').then(m => m.CashFlowModule) },
      { path: 'batch-list', loadChildren: () => import('./../batch-list/batch-list.module').then(m => m.BatchListModule) },
      { path: 'batch-results-entry', loadChildren: () => import('./../batch-results-entry/batch-results-entry.module').then(m => m.BatchResultsEntryModule) },
      { path: 'qa-approval', loadChildren: () => import('./../pacs/pacs.module').then(m => m.PacsModule) },
      { path: 'bulk-report-download', loadChildren: () => import('./../bulk-report-download/bulk-report-download.module').then(m => m.BulkReportDownloadModule) },
      { path: 'covid-walk-in-registrations', loadChildren: () => import('./../covid-walk-in-registrations/covid-walk-in-registrations.module').then(m => m.CovidWalkInRegistrationsModule) },
      { path: 'covid-walk-in-search', loadChildren: () => import('./../covid-walk-in-search/covid-walk-in-search.module').then(m => m.CovidWalkInSearchModule) },
      { path: 'all-masters/bank-master', loadChildren: () => import('./../bank-master/bank-master.module').then(m => m.BankMasterModule) },
      { path: 'all-masters/employee-status', loadChildren: () => import('./../employee-status/employee-status.module').then(m => m.EmployeeStatusModule) },
      { path: 'all-masters/bank-master', loadChildren: () => import('./../bank-master/bank-master.module').then(m => m.BankMasterModule) },
      { path: 'all-masters/department', loadChildren: () => import('./../department/department.module').then(m => m.DepartmentModule) },
      { path: 'all-masters/action-button', loadChildren: () => import('./../action-button/action-button.module').then(m => m.ActionButtonModule) },
      { path: 'all-masters/action-module', loadChildren: () => import('./../action-module/actionModule').then(m => m.ActionModule) },
      { path: 'all-masters/bank-branch-master', loadChildren: () => import('./../bank-branch-master/bank-branch-master.module').then(m => m.BankBranchMasterModule) },
      { path: 'all-masters/action-role', loadChildren: () => import('./../action-role/action-role.module').then(m => m.ActionRoleModule) },
      { path: 'all-masters/action-sub-module', loadChildren: () => import('./../action-sub-module/action-sub-module.module').then(m => m.ActionSubModuleModule) },
      { path: 'all-masters/sub-department', loadChildren: () => import('./../sub-department/sub-department.module').then(m => m.SubDepartmentModule) },
      { path: 'all-masters/unit', loadChildren: () => import('./../unit/unit.module').then(m => m.UnitModule) },
      { path: 'all-masters/application-config', loadChildren: () => import('./../application-config/application-config.module').then(m => m.ApplicationConfigModule) },
      { path: 'group-module', loadChildren: () => import('./../group-module/group-module.module').then(m => m.GroupModuleModule) },
      { path: 'all-masters/lov-type', loadChildren: () => import('./../lov-type/lov-type.module').then(m => m.LovTypeModule) },
      { path: 'all-masters/lov-value', loadChildren: () => import('./../lov-value/lov-value-routing.module').then(m => m.LovValueRoutingModule) },
      { path: 'configurations', loadChildren: () => import('./../configurations/configurations.module').then(m => m.ConfigurationsModule) },
      // { path: 'settings', loadChildren: () => import('./../settings/settings.module').then(m => m.SettingsModule) },
      { path: 'all-master/cluster', loadChildren: () => import('./../cluster/cluster-routing.module').then(m => m.ClusterRoutingModule) },
      { path: 'all-masters/spetiality', loadChildren: () => import('./../spetiality/spetiality.module').then(m => m.SpetialityModule) },
      { path: 'core-features', loadChildren: () => import('../core-features/core-features.module').then(m => m.CoreFeaturesModule) },
    ],
    // canActivate: [AuthGuardGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterPageRoutingModule { }
