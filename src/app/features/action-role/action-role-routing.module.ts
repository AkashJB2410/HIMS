import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionRoleComponent } from './action-role.component';

const routes: Routes = [
  {
    path: '', component:ActionRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionRoleRoutingModule { }
