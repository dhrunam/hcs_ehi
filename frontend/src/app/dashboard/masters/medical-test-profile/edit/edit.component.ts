import { Component } from '@angular/core';
import { MedicalTestProfileService } from '../medical-test-profile.service';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  editMode: boolean=false;
  profile_name: string='';
  id: number= 0;
  constructor(private medicalTestProfileservice: MedicalTestProfileService,
    private activatedRoute:ActivatedRoute ,
    private router: Router
    ){}

  ngOnInit():void{
     this.getMedicalTestProfile();
  }

  getMedicalTestProfile(){
    this.activatedRoute.params.subscribe({
      next: (param: Params)=>
      {
        this.editMode = param['id'] != null;
        if(this.editMode)
        {
          this.id=param['id']
          this.medicalTestProfileservice.get_medical_test_profile(this.id).subscribe(
            {
              next: data => {
                console.log(data.name);
                this.profile_name = data.name;
              }
            }
          );
        }
      }

     });
  }

  onSubmit(data:NgForm){
    let observable: Observable<any>;

    if(!data.valid)
    {
      data.control.markAllAsTouched();
    }
    else
    {
      let fd = new FormData();
      fd.append('name', data.value.name);

      if(this.editMode)
      {
        fd.append('id', this.id.toString());
        observable = this.medicalTestProfileservice.update_medical_test_profile(fd);
      }
      else
      {
        observable = this.medicalTestProfileservice.add_medical_test_profile(fd);
      }

      observable.pipe(take(1)).subscribe({
        next: data=>{
          this.router.navigate(['/dashboard/masters/medical-test-profile']);
        }
      });
      
    }



  }


}
