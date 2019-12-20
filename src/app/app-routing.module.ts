import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

import { IndexPageComponent } from './index-page/index-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { MagicLoginPageComponent } from './magic-login-page/magic-login-page.component';


const routes: Routes = [
  {
    component: IndexPageComponent,
    path: ''
  },
  {
    component: AboutPageComponent,
    path: 'about'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    component: MagicLoginPageComponent,
    path: 'login/:token'
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
