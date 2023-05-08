import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { SectionComponent } from './section.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SectionRoutingModule } from './section-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ViewComponent,
    EditComponent,
    SectionComponent
  ],
  imports: [
    MaterialModule,
    SectionRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class SectionModule { }
