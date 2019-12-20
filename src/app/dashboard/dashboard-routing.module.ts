import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsPageComponent } from './settings-page/settings-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { NoListSelectedComponent } from './no-list-selected/no-list-selected.component';


const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        component: NoListSelectedComponent,
        path: '',
      },
      {
        component: ListDetailComponent,
        path: 'list/:listId'
      }
    ]
  },
  {
    path: 'settings',
    component: SettingsPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
