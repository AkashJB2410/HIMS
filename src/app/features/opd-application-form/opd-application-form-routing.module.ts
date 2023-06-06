import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpdApplicationFormComponent } from './opd-application-form.component';

const routes: Routes = [
  {path:'', component:OpdApplicationFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdApplicationFormRoutingModule { }
