import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterPageComponent } from './master-page.component';

const routes: Routes = [
  {
    path: '', component: MasterPageComponent,
    children: [
      //sidenav routing link
      { path: 'home', loadChildren: () => import('./../home/home.module').then(m => m.HomeModule) },
      // { path: 'registration-form', loadChildren:()=> import('./../registration-form/registration-form.module').then(m=>m.RegistrationFormModule)},
      { path: 'registration-form', loadChildren: () => import('./../registration-form/registration-form.module').then(m => m.RegistrationFormModule) },
      { path: 'create-abha-id', loadChildren: () => import('./../create-abha-id/create-abha-id.module').then(m => m.CreateAbhaIdModule) },
      { path: 'opd-registration-form', loadChildren: () => import('./../registration-form/registration-form.module').then(m => m.RegistrationFormModule) },
      { path: 'ipd-registration-form', loadChildren: () => import('./../registration-form/registration-form.module').then(m => m.RegistrationFormModule) },
      { path: 'self-registration', loadChildren: () => import('./../self-registration/self-registration.module').then(m => m.SelfRegistrationModule) },
      { path: 'configurations', loadChildren: () => import('./../configurations/configurations.module').then(m => m.ConfigurationsModule) },
      { path: 'all-masters/super-speciality', loadChildren: () => import('../master-management-modules/emr-config/super-speciality/super-speciality.module').then(m => m.SuperSpecialityModule) },
      { path: 'all-masters/clinical-forms', loadChildren: () => import('../master-management-modules/emr-config/clinical-forms/clinical-forms.module').then(m => m.ClinicalModule) },
      { path: 'all-masters/clinical-procedures', loadChildren: () => import('../master-management-modules/emr-config/clinical-procedures/clinical-procedures.module').then(m => m.ClinicalProceduresModule) },
      { path: 'all-masters/procedures', loadChildren: () => import('../master-management-modules/emr-config/procedures/procedures.module').then(m => m.ProceduresModule) },
      { path: 'all-masters/document-categorys', loadChildren: () => import('../master-management-modules/emr-config/document-categorys/document-categorys.module').then(m => m.DocumentCategorysModule) },
      { path: 'all-masters/disease-sub-categorys', loadChildren: () => import('../master-management-modules/emr-config/disease-sub-categorys/disease-sub-categorys.module').then(m => m.DiseaseSubCategorysModule) },
      { path: 'all-masters/icd-code-master', loadChildren: () => import('../master-management-modules/emr-config/icd-code-master/icd-code-master.module').then(m => m.IcdCodeMasterModule) },
      { path: 'all-masters/templates', loadChildren: () => import('../master-management-modules/emr-config/template/templates/templates.module').then(m => m.TemplatesModule) },
      { path: 'core-features', loadChildren: () => import('../core-features/core-features.module').then(m => m.CoreFeaturesModule) },
      { path: 'PatientConfigCountry', loadChildren: () => import('../master-management-modules/patient-config/patient-config-country/patient-config-country.module').then(m => m.PatientConfigCountryModule) },
      { path: 'PatientConfigState', loadChildren: () => import('../master-management-modules/patient-config/patient-config-state/patient-config-state.module').then(m => m.PatientConfigStateModule) },
      { path: 'PatientConfigDistrict', loadChildren: () => import('../master-management-modules/patient-config/patient-config-district/patient-config-district.module').then(m => m.PatientConfigDistrictModule) },
      { path: 'PatientConfigCity', loadChildren: () => import('../master-management-modules/patient-config/patient-config-city/patient-config-city.module').then(m => m.PatientConfigCityModule) },
      { path: 'PatientConfigVillage', loadChildren: () => import('../master-management-modules/patient-config/patient-config-village/patient-config-village.module').then(m => m.PatientConfigVillageModule) },
      
    // {path:'all-masters/mst-doctor', loadChildren:()=> import('../mst-doctor/mst-doctor-routing.module').then(m=> m.MstDoctorRoutingModule)}

    //  Doctor Routing
      { path: 'all-masters/doctor-schedule', loadChildren: () => import('../doctor-schedule/doctor-schedule.module').then(m => m.DoctorScheduleModule) },
      { path: 'all-masters/doctor-cabin', loadChildren: () => import('../doctor-cabin/doctor-cabin.module').then(m => m.DoctorCabinModule) },
      { path: 'all-masters/day-master', loadChildren: () => import('../day-master/day-master.module').then(m => m.DayMasterModule) },

      //masters routing link
      { path: 'all-masters', loadChildren: () => import('../master-management-modules/all-masters/all-masters.module').then(m => m.AllMastersModule) },
      { path: 'all-masters/master-module', loadChildren: () => import('../master-management-modules/unit-config/master-module/master-module.module').then(m => m.MasterModuleModule) },
      { path: 'all-masters/sub-module', loadChildren: () => import('../master-management-modules/unit-config/sub-module/sub-module.module').then(m => m.SubModuleModule) },
      { path: 'all-masters/organization', loadChildren: () => import('../master-management-modules/unit-config/organization/organization.module').then(m => m.OrganizationModule) },
      { path: 'all-masters/role-management', loadChildren: () => import('../master-management-modules/unit-config/role-management/role-management.module').then(m => m.RoleManagementModule) },
      { path: 'all-masters/bank-master', loadChildren: () => import('../master-management-modules/unit-config/bank-master/bank-master.module').then(m => m.BankMasterModule) },
      { path: 'all-masters/employee-status', loadChildren: () => import('../master-management-modules/unit-config/employee-status/employee-status.module').then(m => m.EmployeeStatusModule) },
      { path: 'all-masters/bank-master', loadChildren: () => import('../master-management-modules/unit-config/bank-master/bank-master.module').then(m => m.BankMasterModule) },
      { path: 'all-masters/department', loadChildren: () => import('../master-management-modules/unit-config/department/department.module').then(m => m.DepartmentModule) },
      { path: 'all-masters/action-button', loadChildren: () => import('../master-management-modules/unit-config/action-button/action-button.module').then(m => m.ActionButtonModule) },
      { path: 'all-masters/action-module', loadChildren: () => import('../master-management-modules/unit-config/action-module/actionModule').then(m => m.ActionModule) },
      { path: 'all-masters/bank-branch-master', loadChildren: () => import('../master-management-modules/unit-config/bank-branch-master/bank-branch-master.module').then(m => m.BankBranchMasterModule) },
      { path: 'all-masters/action-role', loadChildren: () => import('../master-management-modules/unit-config/action-role/action-role.module').then(m => m.ActionRoleModule) },
      { path: 'all-masters/action-sub-module', loadChildren: () => import('../master-management-modules/unit-config/action-sub-module/action-sub-module.module').then(m => m.ActionSubModuleModule) },
      { path: 'all-masters/sub-department', loadChildren: () => import('../master-management-modules/unit-config/sub-department/sub-department.module').then(m => m.SubDepartmentModule) },
      { path: 'all-masters/unit', loadChildren: () => import('../master-management-modules/unit-config/unit/unit.module').then(m => m.UnitModule) },
      { path: 'all-masters/application-config', loadChildren: () => import('../master-management-modules/unit-config/application-config/application-config.module').then(m => m.ApplicationConfigModule) },
      { path: 'all-masters/group-module', loadChildren: () => import('../master-management-modules/unit-config/group-module/group-module.module').then(m => m.GroupModuleModule) },
      { path: 'all-masters/lov-type', loadChildren: () => import('../master-management-modules/unit-config/lov-type/lov-type.module').then(m => m.LovTypeModule) },
      { path: 'all-masters/lov-value', loadChildren: () => import('../master-management-modules/unit-config/lov-value/lov-value-routing.module').then(m => m.LovValueRoutingModule) },
      { path: 'all-master/cluster', loadChildren: () => import('../master-management-modules/unit-config/cluster/cluster-routing.module').then(m => m.ClusterRoutingModule) },
      { path: 'all-masters/spetiality', loadChildren: () => import('../master-management-modules/unit-config/spetiality/spetiality.module').then(m => m.SpetialityModule) },

      { path: 'CIP', loadChildren: () => import('../master-management-modules/patient-config/cip/cip-routing.module').then(m => m.CIPRoutingModule) },

    ],
    // canActivate: [AuthGuardGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterPageRoutingModule { }
