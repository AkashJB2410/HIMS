import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpdVisitListComponent } from './opd-visit-list.component';

const routes: Routes = [
  {path:'', component:OpdVisitListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdVisitListRoutingModule { }
