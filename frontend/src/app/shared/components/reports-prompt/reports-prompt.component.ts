import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reports-prompt',
  templateUrl: './reports-prompt.component.html',
  styleUrls: ['./reports-prompt.component.css']
})
export class ReportsPromptComponent {
  reportsColumns = ['sno','report_name','report_file'];
  @Input() reports: Array<any> = [];
  @Output() submit = new EventEmitter<{status: boolean}>();

  onSubmit(status: boolean){
    this.submit.emit({status: status});
  }
}
