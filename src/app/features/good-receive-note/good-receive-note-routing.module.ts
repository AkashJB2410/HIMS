import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodReceiveNoteComponent } from './good-receive-note.component';

const routes: Routes = [
  {path:'', component:GoodReceiveNoteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodReceiveNoteRoutingModule { }
