import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeathCertificateComponent } from './death-certificate.component';

const routes: Routes = [
  {path:'', component:DeathCertificateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeathCertificateRoutingModule { }
