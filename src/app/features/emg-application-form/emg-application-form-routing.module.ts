import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmgApplicationFormComponent } from './emg-application-form.component';

const routes: Routes = [
  {path:'', component:EmgApplicationFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmgApplicationFormRoutingModule { }
