import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpdApplicationFormComponent } from './ipd-application-form.component';

const routes: Routes = [
  {path:'', component:IpdApplicationFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpdApplicationFormRoutingModule { }
