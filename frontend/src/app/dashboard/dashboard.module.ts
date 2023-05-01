import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material/material.module';
import { SidebarMenusComponent } from './shared/sidebar-menus/sidebar-menus.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarMenusComponent
  ],
  imports: [
    MaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
