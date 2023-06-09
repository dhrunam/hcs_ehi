import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionConfigComponent } from './session-config.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/configurations/session-config/view', pathMatch: 'full'},
  { path: '', component: SessionConfigComponent,
    children: [
      { path: 'view', component: ViewComponent },
      { path: 'add', component: EditComponent },
      { path: 'edit/:id', component: EditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionConfigRoutingModule { }
