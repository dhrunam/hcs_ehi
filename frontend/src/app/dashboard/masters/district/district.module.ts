import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictRoutingModule } from './district-routing.module';
import { DistrictComponent } from './district.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DistrictComponent,
    ViewComponent,
    EditComponent
  ],
  imports: [
    MaterialModule,
    DistrictRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class DistrictModule { }
