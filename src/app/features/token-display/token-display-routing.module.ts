import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenDisplayComponent } from './token-display.component';

const routes: Routes = [
  {path:'', component:TokenDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TokenDisplayRoutingModule { }
