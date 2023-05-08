import { Component,EventEmitter,Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-form-prompt',
  templateUrl: './form-prompt.component.html',
  styleUrls: ['./form-prompt.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormPromptComponent {
  @Input() promptType: string = '';
  @Output() onSubmit = new EventEmitter<{status: boolean, name?:string}>();

  getStatus(data: {status: boolean, name?:string}){
    this.onSubmit.emit({status: data.status, name: data.name});
  }
}
