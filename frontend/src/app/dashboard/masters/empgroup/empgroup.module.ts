import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { MaterialModule } from 'src/app/material/material.module';
import { EmpgroupRoutingModule } from './empgroup-routing.module';
import { FormsModule } from '@angular/forms';
import { EmpgroupComponent } from './empgroup.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EmpgroupComponent,
    ViewComponent,
    EditComponent
  ],
  imports: [
    MaterialModule,
    EmpgroupRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class EmpgroupModule { }
