import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationConfigComponent } from './application-config.component';

const routes: Routes = [
  {path:'', component:ApplicationConfigComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationConfigRoutingModule { }
