import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfRegistrationComponent } from './self-registration.component';

const routes: Routes = [
  {path:"", component:SelfRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelfRegistrationRoutingModule { }
