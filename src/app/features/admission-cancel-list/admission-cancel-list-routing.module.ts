import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionCancelListComponent } from './admission-cancel-list.component';

const routes: Routes = [
  {path:'', component:AdmissionCancelListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionCancelListRoutingModule { }
