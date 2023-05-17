import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';
const routes: Routes = [
  { path: '', component: EmployeeComponent,
    children: [
      { path: 'add', component: AddComponent },
      { path: 'view', component: ViewComponent },
    ]
  }
];
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
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
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class EmployeeModule { }
