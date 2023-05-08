import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { FormPromptComponent } from "./components/form-prompt/form-prompt.component";
import { MedicalTestComponent } from "./components/form-prompt/medical-test/medical-test.component";
import { SectionComponent } from "./components/form-prompt/section/section.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
      ErrorAlertComponent,
      PromptComponent,
      FormPromptComponent,
      MedicalTestComponent,
      SectionComponent
    ],
    imports: [
      MaterialModule,
      FormsModule,
    ],
    exports: [
      ErrorAlertComponent,
      PromptComponent,
      FormPromptComponent
    ]
})
export class SharedModule{}