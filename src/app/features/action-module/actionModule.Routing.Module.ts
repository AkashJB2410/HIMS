import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionModuleComponent} from './action-module.component'
const routes: Routes = [
  {path:'',component:ActionModuleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionRoutingModule { }
