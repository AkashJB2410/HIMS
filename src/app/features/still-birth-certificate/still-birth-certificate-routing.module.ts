import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StillBirthCertificateComponent } from './still-birth-certificate.component';

const routes: Routes = [
  {path:'', component:StillBirthCertificateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StillBirthCertificateRoutingModule { }
