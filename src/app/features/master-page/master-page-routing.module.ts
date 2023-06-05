import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterPageComponent } from './master-page.component';

const routes: Routes = [
  {
    path: '', component: MasterPageComponent,
    children: [
      { path: 'role-management', loadChildren: () => import('./../role-management/role-management.module').then(m => m.RoleManagementModule) },
      { path: 'master-module', loadChildren: () => import('./../master-module/master-module.module').then(m => m.MasterModuleModule) },
      { path: 'sub-module', loadChildren: () => import('./../sub-module/sub-module.module').then(m => m.SubModuleModule) },
      { path: 'organization', loadChildren:()=> import('./../organization/organizationModule').then(m=>m.OrganizationModule)},
      { path: 'registration-form', loadChildren:()=> import('./../registration-form/registration-form.module').then(m=>m.RegistrationFormModule)},
    ],
    // canActivate: [AuthGuardGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterPageRoutingModule { }
