import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpgroupComponent } from './empgroup.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/masters/empgroup/view', pathMatch: 'full'},
  { path: '', component: EmpgroupComponent,
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
export class EmpgroupRoutingModule { }
