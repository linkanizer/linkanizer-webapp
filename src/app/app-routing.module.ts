import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
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
    component: DashboardPageComponent,
    path: 'dashboard'
  },
  {
    component: MagicLoginPageComponent,
    path: 'login/:token'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
