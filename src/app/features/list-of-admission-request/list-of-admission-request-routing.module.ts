import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfAdmissionRequestComponent } from './list-of-admission-request.component';

const routes: Routes = [
  {path:'', component:ListOfAdmissionRequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOfAdmissionRequestRoutingModule { }
