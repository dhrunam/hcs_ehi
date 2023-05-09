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
  
  medical_test:{
    id:number,
    name:string
  }={id:0,name:''}
  displayedColumns=['sno','test_name','profile_name','test_min_value','test_max_value','operations']

  constructor(private medicalTestService: MedicalTestService
    ,private snackBar: MatSnackBar){}

  
  ngOnInit(){
    
    this.getMedicalTests();

  }
  openPrompt(id:number, name:string){
    this.showPrompt = true;
    this.medical_test = { id: id, name: name};
    this.message = 'medical test: '+name;
  }
  openSnackBar() {
    this.snackBar.open('Employee Deleted', 'Dismiss', {
      duration: 2000
    });
  }
  closePrompt(data: { status: boolean } ){
    if(data.status){
      this.deleteMedicalTest();  
    }
    this.showPrompt = false;
  }

  deleteMedicalTest(){

    this.medicalTestService.delete_medical_test(this.medical_test.id).subscribe({
      next: data=>{
        this.getMedicalTests();
        this.openSnackBar();
      }
    });
  }

  getMedicalTests(){

    this.medicalTestService.get_medical_tests().subscribe({
      next: data=>{
        this.medical_tests=data.results;
        console.log(this.medical_tests);
      }
    });
  }


}
