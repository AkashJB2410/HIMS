import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentCategoryComponent } from './document-category.component';

const routes: Routes = [
  {
    path:"", component:DocumentCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentCategoryRoutingModule { }
