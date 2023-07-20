import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HaspathalReportComponent } from './haspathal-report.component';

const routes: Routes = [
  {path:'', component:HaspathalReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HaspathalReportRoutingModule { }
