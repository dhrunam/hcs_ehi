import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeTypeService } from '../employee-type.service';
import { Observable, take } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  id:number = 0;
  employee_type_name: string = '';
  editMode: boolean = false;
  constructor(private employeeTypeService: EmployeeTypeService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void{
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode = param['id'] != null;
        if(this.editMode){
          this.id = param['id'];
          this.employeeTypeService.get_employee_type(param['id']).subscribe({
            next: data => {
              this.employee_type_name = data.type;
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
      let fd = new FormData();
      fd.append('type', data.value.type);
      if(this.editMode){
        fd.append('id', this.id.toString());
        observable = this.employeeTypeService.update_employee_type(fd);
      }
      else{
        observable = this.employeeTypeService.add_employee_type(fd);
      }
      observable.pipe(take(1)).subscribe({
        next: data => {
          this.router.navigate(['/dashboard/masters/employee-type/view']);
        }
      })
    }
  }
}
