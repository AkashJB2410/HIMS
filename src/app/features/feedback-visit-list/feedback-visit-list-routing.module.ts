import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackVisitListComponent } from './feedback-visit-list.component';

const routes: Routes = [
  {path:'', component:FeedbackVisitListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackVisitListRoutingModule { }
