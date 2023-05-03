import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DistrictService } from '../district.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  district_name: string = '';
  id:number = 0;
  editMode: boolean = false;
  constructor(private districtService: DistrictService, private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void{
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode = param['id'] != null;
        if(this.editMode){
          this.id = param['id'];
          this.districtService.get_district(param['id']).subscribe({
            next: data => {
              this.district_name = data.name;
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
        observable = this.districtService.update_district(fd);
      }
      else{
        observable = this.districtService.add_district(fd);
      }
      observable.pipe(take(1)).subscribe({
        next: data => {
          this.router.navigate(['/dashboard/masters/district']);
        }
      })
    }
  }
}