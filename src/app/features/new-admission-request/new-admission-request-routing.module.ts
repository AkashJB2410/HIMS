import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAdmissionRequestComponent } from './new-admission-request.component';

const routes: Routes = [
  {path:'', component:NewAdmissionRequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAdmissionRequestRoutingModule { }
