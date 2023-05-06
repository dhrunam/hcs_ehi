import { Component } from '@angular/core';
import { MedicalTestProfileService } from '../medical-test-profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { promptAnimation } from 'src/app/shared/animations/prompt.animation';

export interface ViewMedicalTestProfile
{
  id:number;
  name:string;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  animations:[
    promptAnimation
  ]
})
export class ViewComponent {
  medicalTestProfile!: ViewMedicalTestProfile
  dataSource: Array<any> = [];
  displayedColumns: string[] =['sno','name', 'id'];
  showPrompt: boolean = false;
  message: string = '';
  constructor(private medicalTestProfileservice:MedicalTestProfileService, 
  private matSnackBar:MatSnackBar){}

  ngOnInit():void{
    this.getMedicalTestProfiles()
  }

  getMedicalTestProfiles()
  {
    this.medicalTestProfileservice.get_medical_test_profiles().subscribe({
      next: data=>{
        console.log(data);
        this.dataSource=data.results;
      }
    });
  }

  closePrompt(data: {status: boolean}){
    if(data.status){
      this.deleteMedicalTestProfile();
    }
    this.showPrompt = false;
  }

  openPrompt(id:number, name:string){
    this.medicalTestProfile = { id: id, name: name};
    this.showPrompt = true;
    this.message = 'medical test profile '+name;
  }
  

  deleteMedicalTestProfile()
  {
     this.medicalTestProfileservice.delete_medical_test_profile(this.medicalTestProfile.id).subscribe(
      {
        next: data => {
          this.getMedicalTestProfiles();
          this.openSnackBar();

        }
      }
     );
  }

  openSnackBar() {
    this.matSnackBar.open('Medical Test Profile Deleted', 'Dismiss', {
      duration: 2000
    });
  }

}
