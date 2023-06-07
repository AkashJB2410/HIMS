import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkReportDownloadModule } from './bulk-report-download.module';

const routes: Routes = [
  {path:'', component:BulkReportDownloadModule}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkReportDownloadRoutingModule { }
