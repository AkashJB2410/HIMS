import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './core/session/forgot-password/forgot-password.component';
import { SessionComponent } from './core/session/session.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: SessionComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'master-page',
    loadChildren: () =>
      import('./features/master-page/master-page.module').then(
        (m) => m.MasterPageModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

