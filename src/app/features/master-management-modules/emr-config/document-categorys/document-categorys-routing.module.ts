import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentCategorysComponent } from './document-categorys.component';

const routes: Routes = [
  {
    path:'', component:DocumentCategorysComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentCategorysRoutingModule { }
