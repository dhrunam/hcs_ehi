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
  displayedColumns: string[] =['sno','name', 'id', 'isdeleted'];
  showPrompt: boolean = false;
  message: string = '';
  constructor(private medicalTestProfileservice:MedicalTestProfileService, 
  private matSnackBar:MatSnackBar){}

  ngOnInit():void{
    this.getMedicalTestProfiles()
  }

  getMedicalTestProfiles(){
    this.medicalTestProfileservice.get_medical_test_profiles().subscribe({
      next: data=>{
        this.dataSource=data.results;
      }
    });
  }
  deleteMedicalTestProfile(id: number, status:boolean){
     let fd= new FormData();
     fd.append('id', id.toString());
     fd.append('is_deleted', status ? 'False':'True');
     this.medicalTestProfileservice.partial_update_medical_test_profile(fd).subscribe({
        next: data => {
          this.getMedicalTestProfiles();
          // this.openSnackBar();
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
