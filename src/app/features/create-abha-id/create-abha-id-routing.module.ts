import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAbhaIdComponent } from './create-abha-id.component';

const routes: Routes = [
  {path:'', component:CreateAbhaIdComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAbhaIdRoutingModule { }
