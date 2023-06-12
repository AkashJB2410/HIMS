import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionSubModuleComponent } from './action-sub-module.component';

const routes: Routes = [
  {path:'', component:ActionSubModuleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionSubModuleRoutingModule { }
