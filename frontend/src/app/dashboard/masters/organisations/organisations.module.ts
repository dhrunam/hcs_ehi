import { NgModule } from '@angular/core';
import { OrganisationsRoutingModule } from './organisations-routing.module';
import { OrganisationsComponent } from './organisations.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrganisationsComponent,
    ViewComponent,
    EditComponent
  ],
  imports: [
    MaterialModule,
    OrganisationsRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class OrganisationsModule { }
