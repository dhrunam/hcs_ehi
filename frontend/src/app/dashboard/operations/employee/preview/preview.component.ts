import { Component, Input } from '@angular/core';
import { EmployeeDetails } from '../add/add.component';
import { promptAnimation } from 'src/app/shared/animations/prompt.animation';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  animations: [
    promptAnimation
  ],
})

export class PreviewComponent {
  displayedColumns = ['sno','test_name','results','indicator','range'];
  showPrompt: boolean = false;
  @Input() details?: EmployeeDetails;
  @Input() reports: Array<any> = [];
  openPrompt(){
    this.showPrompt = true;
  }
  closePrompt(data: {status: boolean}){
    this.showPrompt = false;
  }
}
