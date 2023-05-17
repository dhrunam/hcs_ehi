import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { EmployeeService } from 'src/app/dashboard/masters/employee/employee.service';
import { HealthRecordService } from '../employee.service';
interface Employee{
  id:number;
  name:string;
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  date!: Date;
  employee: Employee = { id: 0, name: ''};
  employees: Array<any> = [];
  filteredEmployees!: Observable<any[]>;
  constructor(private employeeService: EmployeeService, private healthRecordService: HealthRecordService){}
  ngOnInit(): void{
    this.getEmployees();
    this.date = new Date();

  }
  getEmployees(){
    this.employeeService.get_employees().subscribe({
      next: data => {
        this.employees = data.results;
      }
    })
  }
  onSearchEmployee(key:string){
    key.length >=2 ? this.filteredEmployees = of(this._filter(key)) : this.filteredEmployees = of([]);
  }
  onSelectEmployee(employee: Employee){
    this.employee = employee;
  }
  onSaveDraft(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let collection_date = new Date(data.value.collection_date);
      let registration_date = new Date(data.value.registration_date);
      let fd = new FormData();
      fd.append('employee', this.employee.id.toString());
      fd.append('collection_date', `${collection_date.getFullYear()}-${collection_date.getMonth() + 1 < 10 ? '0':''}${collection_date.getMonth()+1}-${collection_date.getDate() < 10 ? '0':''}${collection_date.getDate()}`);
      fd.append('reg_date', `${registration_date.getFullYear()}-${registration_date.getMonth() + 1 < 10 ? '0':''}${registration_date.getMonth()+1}-${registration_date.getDate() < 10 ? '0':''}${registration_date.getDate()}`);
      fd.append('location',data.value.location);
      fd.append('analyst', data.value.analyst);
      fd.append('ref_doctor', data.value.ref_doctor);
      this.healthRecordService.save_draft(fd).subscribe({
        next: data => {
          console.log(data);
        }
      })
    }
  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.employees.filter(employee => employee.name.toLowerCase().includes(filterValue));
  }
}
