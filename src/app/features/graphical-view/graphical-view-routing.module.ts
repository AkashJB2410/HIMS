import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphicalViewComponent } from './graphical-view.component';

const routes: Routes = [
  {path:'', component:GraphicalViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphicalViewRoutingModule { }
