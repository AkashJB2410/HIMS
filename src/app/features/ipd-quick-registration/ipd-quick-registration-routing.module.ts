import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpdQuickRegistrationComponent } from './ipd-quick-registration.component';

const routes: Routes = [
  {path:'', component:IpdQuickRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpdQuickRegistrationRoutingModule { }
