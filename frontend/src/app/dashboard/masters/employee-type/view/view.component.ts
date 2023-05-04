import { Component } from '@angular/core';
import { EmployeeTypeService } from '../employee-type.service';
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
  types: Array<{id:number, type:string}> = [];
  employee_type!: {id:number, name: string};
  displayedColumns = ['sno', 'type', 'operations'];
  showPrompt: boolean = false;
  message: string = '';
  constructor(private employeeTypeService: EmployeeTypeService,private _snackBar: MatSnackBar) {}
  ngOnInit(): void{
    this.getEmployeeTypes();
  }
  openSnackBar() {
    this._snackBar.open('District Deleted', 'Dismiss', {
      duration: 2000
    });
  }
  openPrompt(id:number, name:string){
    this.employee_type = { id: id, name: name };
    this.showPrompt = true;
    this.message = 'type '+name;
  }
  closePrompt(data: {status: boolean}){
    if(data.status){
      this.deleteType();
    }
    this.showPrompt = false;
  }
  deleteType(){
    this.employeeTypeService.deleted_employee_type(this.employee_type.id).subscribe({
      next: data => {
        this.getEmployeeTypes();
        this.openSnackBar();
      }
    })
  }
  getEmployeeTypes(){
    this.employeeTypeService.get_employee_types().subscribe({
      next: data => {
        this.types = data.results;
      }
    })
  }
}
