import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CIPComponent } from './cip.component';

const routes: Routes = [{path:'',component:CIPComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CIPRoutingModule { }
