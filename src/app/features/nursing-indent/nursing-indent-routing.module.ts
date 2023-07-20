import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NursingConsoleComponent } from '../nursing-console/nursing-console.component';

const routes: Routes = [
  {path:'', component:NursingConsoleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NursingIndentRoutingModule { }
