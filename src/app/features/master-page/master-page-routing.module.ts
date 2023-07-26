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
      { path: 'core-features', loadChildren: () => import('../core-features/core-features.module').then(m => m.CoreFeaturesModule) },
      //masters routing link
      { path: 'all-masters', loadChildren: () => import('./../all-masters/all-masters.module').then(m => m.AllMastersModule) },
      { path: 'all-masters/master-module', loadChildren: () => import('./../master-module/master-module.module').then(m => m.MasterModuleModule) },
      { path: 'all-masters/sub-module', loadChildren: () => import('./../sub-module/sub-module.module').then(m => m.SubModuleModule) },
      { path: 'all-masters/organization', loadChildren: () => import('./../organization/organizationModule').then(m => m.OrganizationModule) },
      { path: 'all-masters/role-management', loadChildren: () => import('./../role-management/role-management.module').then(m => m.RoleManagementModule) },
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
      { path: 'all-masters/group-module', loadChildren: () => import('./../group-module/group-module.module').then(m => m.GroupModuleModule) },
      { path: 'all-masters/lov-type', loadChildren: () => import('./../lov-type/lov-type.module').then(m => m.LovTypeModule) },
      { path: 'all-masters/lov-value', loadChildren: () => import('./../lov-value/lov-value-routing.module').then(m => m.LovValueRoutingModule) },
      { path: 'all-master/cluster', loadChildren: () => import('./../cluster/cluster-routing.module').then(m => m.ClusterRoutingModule) },
      { path: 'all-masters/spetiality', loadChildren: () => import('./../spetiality/spetiality.module').then(m => m.SpetialityModule) },
    ],
    // canActivate: [AuthGuardGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterPageRoutingModule { }
