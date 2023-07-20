import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DispatchGovtComponent } from './dispatch-govt.component';

const routes: Routes = [
  {path:'', component:DispatchGovtComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispatchGovtRoutingModule { }
