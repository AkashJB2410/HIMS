import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostMortemCertificateComponent } from './post-mortem-certificate.component';

const routes: Routes = [
  {path:'', component:PostMortemCertificateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostMortemCertificateRoutingModule { }
