import { Component } from '@angular/core';
import { promptAnimation } from 'src/app/shared/animations/prompt.animation';
import { MedicalTestService } from '../medical-test.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicalTest, MedicalTestProfile } from '../medical-test.model';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  animations:[promptAnimation,]
})
export class ViewComponent {
  message: string='';
  showPrompt: boolean=false;
  medical_tests:Array<MedicalTest>=[]
  displayedColumns=['sno','test_name','profile_name','test_min_value','test_max_value','operations', 'isdeleted']

  constructor(private medicalTestService: MedicalTestService,private snackBar: MatSnackBar){}
  ngOnInit(){
    this.getMedicalTests();
  }
  openSnackBar() {
    this.snackBar.open('Employee Deleted', 'Dismiss', {
      duration: 2000
    });
  }
  deleteMedicalTest(id:number, status: boolean){
    let fd=new FormData();
    fd.append('id', id.toString());
    fd.append('is_deleted', status ? 'False' : 'True');
    this.medicalTestService.partial_update_medical_test(fd).subscribe({
      next: data=>{
        this.getMedicalTests();
        // this.openSnackBar();
      }
    });
  }
  getMedicalTests(){
    this.medicalTestService.get_medical_tests().subscribe({
      next: data=>{
        this.medical_tests=data.results;
      }
    });
  }


}
