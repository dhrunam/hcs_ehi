import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Employee } from '../employee.model';
import { Observable, take } from 'rxjs';
import { EmployeeTypeService } from '../../employee-type/employee-type.service';
import { DesignationService } from '../../designation/designation.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  lastDayOfMonth!: Date;
  designations: Array<any> = [];
  organisations: Array<any> = [];
  bloodgroups: Array<any> = [];
  employeeTypes: Array<any> = [];
  date_of_superannuation: any;
  employee!: Employee;
  editMode: boolean = false;
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private employeeTypeService: EmployeeTypeService,
    private designationService: DesignationService){}
  ngOnInit(): void{
    this.getDesignation();
    this.getBloodGroups();
    this.getOrganisations();
    this.getEmployeeTypes();
    this.employee = new Employee();
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode = param['id'] != null;
        if(this.editMode){
          this.employeeService.get_employee(param['id']).subscribe({
            next: data => {
              this.employee = data;
              this.date_of_superannuation = data.date_of_superannuation;
            }
          })
        }
      }
    })
  }
  onSubmit(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let observable: Observable<any>;
      let dob = new Date(data.value.emp_dob.toLocaleString());
      let does = new Date(data.value.emp_does.toLocaleString());
      let fd = new FormData();
      fd.append('emp_id', data.value.emp_id);
      fd.append('designation', data.value.emp_desg);
      fd.append('organisation', data.value.emp_org);
      fd.append('name', data.value.emp_name);
      fd.append('blood_group', data.value.emp_bgroup);
      fd.append('residenntial_address', data.value.emp_add);
      fd.append('type', data.value.emp_type);
      fd.append('date_of_birth', `${dob.getFullYear()}-${dob.getMonth()+1 >= 10 ? '': '0'}${dob.getMonth()+1}-${dob.getDate() >= 10 ? '': '0'}${dob.getDate()}`);
      fd.append('date_of_joining', `${does.getFullYear()}-${does.getMonth()+1 >= 10 ? '': '0'}${does.getMonth()+1}-${does.getDate() >= 10 ? '': '0'}${does.getDate()}`);
      fd.append('date_of_superannuation', this.lastDayOfMonth ? `${this.lastDayOfMonth.getFullYear()}-${dob.getMonth()+1 >= 10 ? '': '0'}${this.lastDayOfMonth.getMonth()+1}-${this.lastDayOfMonth.getDate()}` : this.date_of_superannuation);
      if(this.editMode){
        fd.append('id', this.employee.id.toString());
        observable = this.employeeService.update_employee(fd);
      }
      else{
        observable = this.employeeService.add_employee(fd);
      }
      observable.pipe(take(1)).subscribe({
        next: data => {
          this.router.navigate(['/dashboard/masters/medical-test/view']);
        }
      })
    }
  }
  onAddSuperannuation(event: MatDatepickerInputEvent<Date>){
    let date = new Date(event.value!.toLocaleString());
    this.lastDayOfMonth = new Date(date.getFullYear()+58, date.getMonth()+1, 0)
    this.date_of_superannuation = this.lastDayOfMonth;
  }
  getDesignation(){
    this.designationService.get_designations().subscribe({
      next: data => this.designations = data.results,
    })
  }
  getOrganisations(){
    this.employeeService.get_organisations().subscribe({
      next: data => this.organisations = data.results,
    })
  }
  getBloodGroups(){
    this.employeeService.get_bloodgroups().subscribe({
      next: data => this.bloodgroups = data.results,
    })
  }
  getEmployeeTypes(){
    this.employeeTypeService.get_employee_types().subscribe({
      next: data => this.employeeTypes = data.results,
    })
  }
}