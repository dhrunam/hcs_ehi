import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';
import { PromptComponent } from './components/prompt/prompt.component';

@NgModule({
    declarations: [
      ErrorAlertComponent,
      PromptComponent
    ],
    imports: [
      MaterialModule,
    ],
    exports: [
      ErrorAlertComponent,
      PromptComponent,
    ]
})
export class SharedModule{}