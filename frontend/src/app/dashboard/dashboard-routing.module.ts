import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/home', pathMatch: 'full'},
  { path: '', component: DashboardComponent,
    children: [
      { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent) },
      { path: 'masters', loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule) },
      { path: 'configurations', loadChildren: () => import('./configurations/configurations.module').then(m => m.ConfigurationsModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
