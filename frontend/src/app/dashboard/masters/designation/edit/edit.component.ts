import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DesignationService } from '../designation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  editMode:boolean = false;
  designation_name: string = '';
  selected_emp_group: number=0;
  hierarchy:number=0;
  emp_data_source: Array<{id: number, name:string}> = [];
  id:number = 0;
  constructor( private designationService: DesignationService, private route: ActivatedRoute,private router: Router){}

  ngOnInit(): void{
    this.getEmpGroups();
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode = param['id'] != null;
        if(this.editMode){
          this.id = param['id'];
          this.designationService.get_designation(param['id']).subscribe({
            next: data => {
              this.designation_name = data.name;
              this.hierarchy= data.hierarchy;
              this.selected_emp_group=data.emp_group
            }
          })
        }
      }
    })
  }
  
  onSubmit(data:NgForm){
    let observable: Observable<any>;
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('name', data.value.name);
      fd.append('hierarchy', data.value.hierarchy)
      fd.append('emp_group', data.value.emp_group)
      if(this.editMode){
        fd.append('id', this.id.toString());
        observable = this.designationService.update_designation(fd);
      }
      else{
        observable = this.designationService.add_designation(fd);
      }
      observable.subscribe({
        next: data => {
          this.router.navigate(['/dashboard/masters/designation']);
        }
      })
    }
  }
  getEmpGroups(){
    this.designationService.get_emp_group().subscribe({
      next: data => {
        this.emp_data_source=data.results;
        
      }
    })
  }
}
