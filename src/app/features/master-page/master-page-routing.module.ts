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
      // { path: 'registration-form', loadChildren:()=> import('./../registration-form/registration-form.module').then(m=>m.RegistrationFormModule)},
      { path: 'home', loadChildren: () => import('./../home/home.module').then(m => m.HomeModule) },
      { path: 'emergency-quick-registration', loadChildren: () => import('./../emergency-quick-registration/emergency-quick-registration.module').then(m => m.EmergencyQuickRegistrationModule) },
      { path: 'er-patient-list', loadChildren: () => import('./../er-patient-list/er-patient-list.module').then(m => m.ErPatientListModule) },
      { path: 'all-masters', loadChildren: () => import('./../all-masters/all-masters.module').then(m => m.AllMastersModule) },
      { path: 'create-abha-id', loadChildren: () => import('./../create-abha-id/create-abha-id.module').then(m => m.CreateAbhaIdModule) },
      { path: 'patient-list', loadChildren: () => import('./../patient-list/patient-list.module').then(m => m.PatientListModule) },
      // { path: 'quick-patient-reg-visit', loadChildren: () => import('./../quick-patient-reg-visit/quick-patient-reg-visit.module').then( m => m.QuickPatientRegVisitModule)},
      { path: 'opd-registration-form', loadChildren: () => import('./../registration-form/registration-form.module').then(m => m.RegistrationFormModule) },
      { path: 'ipd-registration-form', loadChildren: () => import('./../registration-form/registration-form.module').then(m => m.RegistrationFormModule) },
      { path: 'eme-registration-form', loadChildren: () => import('./../registration-form/registration-form.module').then(m => m.RegistrationFormModule) },
      { path: 'feedback-visit-list', loadChildren: () => import('./../feedback-visit-list/feedback-visit-list.module').then(m => m.FeedbackVisitListModule) },
      { path: 'list-of-visit-report', loadChildren: () => import('./../list-of-visit-report/list-of-visit-report.module').then(m => m.ListOfVisitReportModule) },
      { path: 'ipd-quick-registration', loadChildren: () => import('./../registration-form/registration-form-routing.module').then(m => m.RegistrationFormRoutingModule) },
      // { path: 'ipd-quick-registration', loadChildren: () => import('./../ipd-quick-registration/ipd-quick-registration.module').then( m => m.IpdQuickRegistrationModule)},
      { path: 'current-stock', loadChildren: () => import('./../current-stock/current-stock.module').then(m => m.CurrentStockModule) },
      { path: 'ambulance-requisition', loadChildren: () => import('./../ambulance-requisition/ambulance-requisition.module').then(m => m.AmbulanceRequisitionModule) },
      { path: 'opd-application-form', loadChildren: () => import('./../opd-application-form/opd-application-form.module').then(m => m.OpdApplicationFormModule) },
      { path: 'ipd-application-form', loadChildren: () => import('./../ipd-application-form/ipd-application-form.module').then(m => m.IpdApplicationFormModule) },
      { path: 'birth-certificate', loadChildren: () => import('./../birth-certificate/birth-certificate.module').then(m => m.BirthCertificateModule) },
      { path: 'still-birth-certificate', loadChildren: () => import('./../still-birth-certificate/still-birth-certificate.module').then(m => m.StillBirthCertificateModule) },
      { path: 'death-certificate', loadChildren: () => import('./../death-certificate/death-certificate.module').then(m => m.DeathCertificateModule) },
      { path: 'post-mortem-certificate', loadChildren: () => import('./../post-mortem-certificate/post-mortem-certificate.module').then(m => m.PostMortemCertificateModule) },
      { path: 'ipd-bill', loadChildren: () => import('./../ipd-bill/ipd-bill.module').then(m => m.IpdBillModule) },
      { path: 'lab-order-list', loadChildren: () => import('./../lab-order-list/lab-order-list.module').then(m => m.LabOrderListModule) },
      { path: 'lab-consumption-report', loadChildren: () => import('./../lab-consumption-report/lab-consumption-report.module').then(m => m.LabConsumptionReportModule) },
      { path: 'lab-order', loadChildren: () => import('./../lab-order/lab-order.module').then(m => m.LabOrderModule) },
      { path: 'pacs', loadChildren: () => import('./../pacs/pacs.module').then(m => m.PacsModule) },
      { path: 'requisition', loadChildren: () => import('../requisition/requisition.module').then(m => m.RequisitionModule) },
      { path: 'transfer', loadChildren: () => import('./../transfer/transfer.module').then(m => m.TransferModule) },
      { path: 'receive', loadChildren: () => import('./../receive/receive.module').then(m => m.ReceiveModule) },
      { path: 'radiology-confirmation', loadChildren: () => import('./../radiology-cofirmation/radiology-cofirmation.module').then(m => m.RadiologyCofirmationModule) },
      { path: 'quick-radiology-confirmation', loadChildren: () => import('./../quick-radiology-confirmation/quick-radiology-confirmation.module').then(m => m.QuickRadiologyConfirmationModule) },
      { path: 'additional-charges', loadChildren: () => import('./../additional-charges/additional-charges.module').then(m => m.AdditionalChargesModule) },
      { path: 'radiology-reports', loadChildren: () => import('./../radiology-reports/radiology-reports.module').then(m => m.RadiologyReportsModule) },
      { path: 'results-update', loadChildren: () => import('./../results-update/results-update.module').then(m => m.ResultsUpdateModule) },
      { path: 'qa-approval', loadChildren: () => import('./../pacs/pacs.module').then(m => m.PacsModule) },
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
      { path: 'self-registration', loadChildren: () => import('./../self-registration/self-registration.module').then(m => m.SelfRegistrationModule) },
      { path: 'all-masters/lov-type', loadChildren: () => import('./../lov-type/lov-type.module').then(m => m.LovTypeModule) },
      { path: 'all-masters/lov-value', loadChildren: () => import('./../lov-value/lov-value-routing.module').then(m => m.LovValueRoutingModule) },
      { path: 'configurations', loadChildren: () => import('./../configurations/configurations.module').then(m => m.ConfigurationsModule) },
      { path: 'all-master/cluster', loadChildren: () => import('./../cluster/cluster-routing.module').then(m => m.ClusterRoutingModule) },
      { path: 'all-masters/spetiality', loadChildren: () => import('./../spetiality/spetiality.module').then(m => m.SpetialityModule) },
      { path: 'core-features', loadChildren: () => import('../core-features/core-features.module').then(m => m.CoreFeaturesModule) },
    //  Doctor Routing
      { path: 'all-masters/doctor-schedule', loadChildren: () => import('../doctor-schedule/doctor-schedule.module').then(m => m.DoctorScheduleModule) },
      { path: 'all-masters/doctor-cabin', loadChildren: () => import('../doctor-cabin/doctor-cabin.module').then(m => m.DoctorCabinModule) },
      { path: 'all-masters/day-master', loadChildren: () => import('../day-master/day-master.module').then(m => m.DayMasterModule) }
    ],
    // canActivate: [AuthGuardGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterPageRoutingModule { }
