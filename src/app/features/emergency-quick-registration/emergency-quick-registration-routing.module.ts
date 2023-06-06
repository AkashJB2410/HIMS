import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmergencyQuickRegistrationComponent } from './emergency-quick-registration.component';

const routes: Routes = [
  {path:'', component:EmergencyQuickRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmergencyQuickRegistrationRoutingModule { }
