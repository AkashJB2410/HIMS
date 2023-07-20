import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsUpdateComponent } from './results-update.component';

const routes: Routes = [
  {path:'', component:ResultsUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsUpdateRoutingModule { }
