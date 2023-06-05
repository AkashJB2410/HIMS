import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtRequestComponent } from './ot-request.component';

const routes: Routes = [
  {path:'', component:OtRequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtRequestRoutingModule { }
