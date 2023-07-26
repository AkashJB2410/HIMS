import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterModuleComponent } from './master-module.component';

const routes: Routes = [
  { path: '', component: MasterModuleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterModuleRoutingModule { }
