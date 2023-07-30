import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentCategoryRoutingModule } from './document-category-routing.module';
import { DocumentCategoryComponent } from './document-category.component';


@NgModule({
  declarations: [
    DocumentCategoryComponent
  ],
  imports: [
    CommonModule,
    DocumentCategoryRoutingModule
  ]
})
export class DocumentCategoryModule { }
