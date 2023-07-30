import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LovTypeComponent } from './lov-type.component';

const routes: Routes = [
  {
    path:'', component:LovTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LovTypeRoutingModule { }
