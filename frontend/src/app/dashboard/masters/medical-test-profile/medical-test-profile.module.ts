import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalTestProfileRoutingModule } from './medical-test-profile-routing.module';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicalTestProfileComponent } from './medical-test-profile.component';


@NgModule({
  declarations: [
    MedicalTestProfileComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    MaterialModule,
    MedicalTestProfileRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class MedicalTestProfileModule { }
