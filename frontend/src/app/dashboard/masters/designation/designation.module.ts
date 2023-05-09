import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationComponent } from './designation.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { DesignationRoutingModule } from './designation-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DesignationComponent,
    ViewComponent,
    EditComponent
  ],
  imports: [
    MaterialModule,
    DesignationRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class DesignationModule { }
