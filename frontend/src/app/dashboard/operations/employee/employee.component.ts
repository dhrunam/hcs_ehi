import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable, from, map, of, startWith } from 'rxjs';
import { EmployeeService } from '../../masters/employee/employee.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  selectedEmployee:string = '';
  selectedEmployeeId: number = 0;
  employees:Array<any> = [];
  myControl = new FormControl('');
  filteredOptions!: Observable<any[]>;
  constructor(private employeeService: EmployeeService){}
  ngOnInit() {
    this.getEmployees();
  }
  onGetList(key: string){
    if(key.length >= 3){
      this.filteredOptions = of(this._filter(key || ''));
    }
    else{
      this.filteredOptions = of([]);
    }
  }
  getEmployees(){
    this.employeeService.get_employees().subscribe({
      next: data => {
        this.employees = data.results;
      }
    })
  }
  selectedOption(name:string){
    this.selectedEmployee = name;
    this.selectedEmployeeId = this.employees.find(employee => employee.name === name).id;
  }
  onSubmit(data: NgForm){
    if(!data.valid){
      
    }
    else{
      if(!this._found(data.value.search_emp)){
        alert('Error !! Please check the user details');
      }
      else{

      }
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.employees.filter(employee => employee.name.toLowerCase().includes(filterValue));
  }
  private _found(value: string): boolean{
    return this.employees.some(employee => employee.name === value)
  }
}