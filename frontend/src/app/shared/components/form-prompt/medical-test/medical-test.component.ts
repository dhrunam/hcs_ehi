import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-medical-test',
  templateUrl: './medical-test.component.html',
  styleUrls: ['./medical-test.component.css']
})
export class MedicalTestComponent {
  @Input() message: string = '';
  @Output() submit = new EventEmitter<{status: boolean, name?: string}>();
  onSubmit(status: boolean){
    this.submit.emit({status: status});
  }
  onAddProfile(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.submit.emit({status: true, name: data.value.medical});
    }
  }
}
