import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupModuleComponent } from './group-module.component';

const routes: Routes = [
  {path:'',component:GroupModuleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupModuleRoutingModule { }
