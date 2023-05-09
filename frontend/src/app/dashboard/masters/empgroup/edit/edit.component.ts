import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmpgroupService } from '../empgroup.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  empgroup_name: string = '';
  id:number = 0;
  editMode: boolean = false;
  constructor(private empgroupService: EmpgroupService, private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void{
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode = param['id'] != null;
        if(this.editMode){
          this.id = param['id'];
          this.empgroupService.get_empgroup(param['id']).subscribe({
            next: data => {
              this.empgroup_name = data.name;
            }
          })
        }
      }
    })
  }
  onSubmit(data: NgForm){
    let observable: Observable<any>;
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('name', data.value.name);
      if(this.editMode){
        fd.append('id', this.id.toString());
        observable = this.empgroupService.update_empgroup(fd);
      }
      else{
        observable = this.empgroupService.add_empgroup(fd);
      }
      observable.pipe(take(1)).subscribe({
        next: data => {
          this.router.navigate(['/dashboard/masters/empgroup']);
        }
      })
    }
  }
}