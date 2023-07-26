import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpdRegistrationComponent } from './opd-registration.component';

const routes: Routes = [
  { path: '', component: OpdRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdRegistrationRoutingModule { }
