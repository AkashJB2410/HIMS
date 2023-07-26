import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IcdCodeComponent } from './icd-code.component';

const routes: Routes = [
  {
    path:"", component:IcdCodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcdCodeRoutingModule { }
