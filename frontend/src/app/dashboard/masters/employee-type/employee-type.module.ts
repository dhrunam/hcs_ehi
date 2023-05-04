import { NgModule } from '@angular/core';
import { EmployeeTypeRoutingModule } from './employee-type-routing.module';
import { EmployeeTypeComponent } from './employee-type.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeeTypeComponent,
    ViewComponent,
    EditComponent
  ],
  imports: [
    MaterialModule,
    EmployeeTypeRoutingModule,
    FormsModule,
  ]
})
export class EmployeeTypeModule { }
