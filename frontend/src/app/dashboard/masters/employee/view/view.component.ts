import { Component } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { promptAnimation } from 'src/app/shared/animations/prompt.animation';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  animations: [
    promptAnimation
  ]
})
export class ViewComponent {
  showPrompt: boolean = false;
  employee!: {id: number, name: string};
  employees: Employee[] = [];
  message: string = '';
  displayedColumns = ['sno','emp_name','emp_id','emp_org','operations'];
  constructor(private employeeSerivce: EmployeeService,private _snackBar: MatSnackBar){}
  ngOnInit(): void{
    this.getEmployees();
  }
  openSnackBar() {
    this._snackBar.open('Employee Deleted', 'Dismiss', {
      duration: 2000
    });
  }
  getEmployees(){
    this.employeeSerivce.get_employees().subscribe({
      next: data => {
        this.employees = data.results;
      }
    })
  }
  openPrompt(id:number, name:string){
    this.showPrompt = true;
    this.employee = { id: id, name: name};
    this.message = 'employee '+name;
  }
  closePrompt(data: { status: boolean } ){
    if(data.status){
      this.deleteEmployee();  
    }
    this.showPrompt = false;
  }
  deleteEmployee(){
    this.employeeSerivce.delete_employee(this.employee.id).subscribe({
      next: data => {
        this.getEmployees();
        this.openSnackBar();
      }
    })
  }
}
