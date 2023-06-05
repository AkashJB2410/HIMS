import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbulanceRequisitionComponent } from './ambulance-requisition.component';

const routes: Routes = [
  {path:'', component:AmbulanceRequisitionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmbulanceRequisitionRoutingModule { }
