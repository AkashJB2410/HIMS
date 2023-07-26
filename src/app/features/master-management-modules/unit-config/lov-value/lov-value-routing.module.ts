import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LovValueComponent } from './lov-value.component';

const routes: Routes = [
  {path:'', component:LovValueComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LovValueRoutingModule { }
