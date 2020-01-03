import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { MainPageComponent } from './main-page/main-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { NoListSelectedComponent } from './no-list-selected/no-list-selected.component';


@NgModule({
  declarations: [MainPageComponent, SettingsPageComponent, ListDetailComponent, NoListSelectedComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule {
}
