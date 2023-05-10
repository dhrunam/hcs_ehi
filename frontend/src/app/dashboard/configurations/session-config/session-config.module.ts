import { NgModule } from '@angular/core';
import { SessionConfigRoutingModule } from './session-config-routing.module';
import { SessionConfigComponent } from './session-config.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { MAT_DATE_FORMATS } from '@angular/material/core';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};
@NgModule({
  declarations: [
    SessionConfigComponent,
    ViewComponent,
    EditComponent
  ],
  imports: [
    MaterialModule,
    SessionConfigRoutingModule,
    FormsModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class SessionConfigModule { }
