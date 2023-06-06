import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacsComponent } from './pacs.component';

const routes: Routes = [
  {path:'', component:PacsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacsRoutingModule { }
