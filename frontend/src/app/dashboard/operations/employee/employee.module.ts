import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
const routes: Routes = [
  { path: '', component: EmployeeComponent,
    children: [
      { path: 'add', component: AddComponent },
      { path: 'view', component: ViewComponent },
    ]
  }
];
@NgModule({
  declarations: [
    EmployeeComponent,
    AddComponent,
    ViewComponent,
  ],
  imports: [
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EmployeeModule { }
