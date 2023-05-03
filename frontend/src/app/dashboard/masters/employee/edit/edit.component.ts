import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  lastDayOfMonth!: Date;
  date_of_superannuation: string = '';
  onSubmit(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let dob = new Date(data.value.emp_dob.toLocaleString());
      let does = new Date(data.value.emp_does.toLocaleString());
      console.log(data.value, dob, does, this.lastDayOfMonth);
    }
  }
  onAddSuperannuation(event: MatDatepickerInputEvent<Date>){
    let date = new Date(event.value!.toLocaleString());
    this.lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0)
    this.date_of_superannuation = `${this.lastDayOfMonth.getDate()}/${this.lastDayOfMonth.getMonth()+1 > 10 ? '': '0'}${date.getMonth()+1}/${date.getFullYear()+58}`
  }
}
