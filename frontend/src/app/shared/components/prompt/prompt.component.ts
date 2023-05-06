import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent {
  @Input() message: string = '';
  @Output() submit = new EventEmitter<{status: boolean}>();

  onSubmit(status: boolean){
    this.submit.emit({status: status});
  }
}
