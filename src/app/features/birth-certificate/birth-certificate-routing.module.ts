import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BirthCertificateComponent } from './birth-certificate.component';

const routes: Routes = [
  {path:'', component:BirthCertificateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BirthCertificateRoutingModule { }
