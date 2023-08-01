import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IcdCodeMasterComponent } from './icd-code-master.component';

const routes: Routes = [
  {
    path:'', component:IcdCodeMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcdCodeMasterRoutingModule { }
