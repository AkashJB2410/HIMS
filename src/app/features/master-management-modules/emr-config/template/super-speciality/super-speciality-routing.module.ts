import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperSpecialityComponent } from './super-speciality.component';

const routes: Routes = [
  {
    path:'',
    component:SuperSpecialityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperSpecialityRoutingModule { }
