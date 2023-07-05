import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';

const routes: Routes = [
  {
    path: '', component: MasterComponent,
    children: [
      { path: 'worklist', loadChildren: () => import('../../features/worklist/worklist.module').then(m => m.WorklistModule) },
      { path: 'dashboard', loadChildren: () => import('../../features/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'user-management', loadChildren: () => import('../../features/user-management/user-management.module').then(m => m.UserManagementModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
