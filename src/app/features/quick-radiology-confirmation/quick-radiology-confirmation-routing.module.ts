import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickRadiologyConfirmationComponent } from './quick-radiology-confirmation.component';

const routes: Routes = [
  {path:'', component:QuickRadiologyConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickRadiologyConfirmationRoutingModule { }
