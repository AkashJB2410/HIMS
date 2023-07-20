import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadiologyCofirmationComponent } from './radiology-cofirmation.component';

const routes: Routes = [
  {path:'', component:RadiologyCofirmationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadiologyCofirmationRoutingModule { }
