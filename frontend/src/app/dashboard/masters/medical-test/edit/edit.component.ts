import { Component } from '@angular/core';
import { MedicalTestService } from '../medical-test.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MedicalTest, MedicalTestProfile } from '../medical-test.model';
import { Observable, observable, take } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  editMode:boolean=false;
  id:number=0;
  test_name:string='';
  medical_test:MedicalTest={
    id:0,name:'', 
    profile:0, 
    normal_min_value:0, 
    normal_max_value:0, 
    unit:"",
    is_deleted:false
  };
  medical_test_profiles: Array<MedicalTestProfile>=[]

  constructor(private medicalTestService: MedicalTestService,private route:ActivatedRoute,private router:Router){}
  
  ngOnInit():void{
    this.getMedicalTest();
    this.getMedicalTestProfiles();
  }

  getMedicalTest(){
    this.route.params.subscribe({
      next: (param: Params)=>
      {
        this.editMode = param['id'] != null;
        if(this.editMode)
        {
          this.id=param['id']
          this.medicalTestService.get_medical_test(this.id).subscribe(
            {
              next: data => {
                this.medical_test=data
              }
            }
          );
        }
      }

     });
  }

  getMedicalTestProfiles(){
    this.medicalTestService.get_medical_test_profiles().subscribe({
      next: data=>{
        this.medical_test_profiles=data;
      }
    });
  }

  onSubmit(data:NgForm){

    if(!data.valid)
    {
      data.control.markAllAsTouched();
    }
    else
    {
      let observable: Observable<any>;
      let fd =new FormData();
      fd.append('name', data.value.test_name);
      fd.append('profile', data.value.test_profile);
      fd.append('normal_min_value', data.value.normal_min_value);
      fd.append('normal_max_value', data.value.normal_max_value);    
      fd.append('unit',data.value.unit); 
      if(this.editMode)
      {
        fd.append('id', this.medical_test.id.toString())
        observable=this.medicalTestService.update_medical_test(fd);
      }
      else
      {
        observable=this.medicalTestService.add_medical_test(fd);
      }

      observable.pipe(take(1)).subscribe({
        next: data=>{
          this.router.navigate(['/dashboard/masters/medical-test']);
        }
      });
    }


  }


}
