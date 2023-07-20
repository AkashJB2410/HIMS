import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchResultsEntryComponent } from './batch-results-entry.component';

const routes: Routes = [
  {path:'', component:BatchResultsEntryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchResultsEntryRoutingModule { }
