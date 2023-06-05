import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubModuleComponent } from './sub-module.component';

const routes: Routes = [
  { path: '', component: SubModuleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubModuleRoutingModule { }
