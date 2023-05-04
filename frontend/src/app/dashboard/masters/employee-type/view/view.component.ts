import { Component } from '@angular/core';
import { EmployeeTypeService } from '../employee-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  types: Array<{id:number, type:string}> = [];
  displayedColumns = ['sno', 'type', 'operations'];
  constructor(private employeeTypeService: EmployeeTypeService,private _snackBar: MatSnackBar) {}
  ngOnInit(): void{
    this.getEmployeeTypes();
  }
  openSnackBar() {
    this._snackBar.open('District Deleted', 'Dismiss');
  }
  onDeleteEmployeeType(id:number){
    if(confirm('Are you sure you want to delete employee type ?')){
      this.employeeTypeService.deleted_employee_type(id).subscribe({
        next: data => {
          this.getEmployeeTypes();
          this.openSnackBar();
        }
      })
    }
  }
  getEmployeeTypes(){
    this.employeeTypeService.get_employee_types().subscribe({
      next: data => {
        this.types = data.results;
      }
    })
  }
}
