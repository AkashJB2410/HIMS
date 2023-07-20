import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkReportDownloadModule } from './bulk-report-download.module';
import { BulkReportDownloadComponent } from './bulk-report-download.component';

const routes: Routes = [
  {path:'', component:BulkReportDownloadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkReportDownloadRoutingModule { }
