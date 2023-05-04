import { Component } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  employees: Employee[] = [];
  displayedColumns = ['sno','emp_name','emp_id','emp_org','operations'];
  constructor(private employeeSerivce: EmployeeService,private _snackBar: MatSnackBar){}
  ngOnInit(): void{
    this.getEmployees();
  }
  openSnackBar() {
    this._snackBar.open('Employee Deleted', 'Dismiss');
  }
  onDeleteEmployee(id:number){
    if(confirm('Are you sure you want to delete this employee ?')){
      this.employeeSerivce.delete_employee(id).subscribe({
        next: data => {
          this.getEmployees();
          this.openSnackBar();
        }
      })
    }
  }
  getEmployees(){
    this.employeeSerivce.get_employees().subscribe({
      next: data => {
        this.employees = data.results;
      }
    })
  }
}
