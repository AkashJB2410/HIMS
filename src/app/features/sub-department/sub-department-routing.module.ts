import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubDepartmentComponent } from './sub-department.component';

const routes: Routes = [
  {
    path:'', component:SubDepartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubDepartmentRoutingModule { }
