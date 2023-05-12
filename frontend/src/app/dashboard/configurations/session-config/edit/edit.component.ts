import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { MedicalTestProfileService } from 'src/app/dashboard/masters/medical-test-profile/medical-test-profile.service';
import { SessionConfigService } from '../session-config.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  @ViewChild('picker', { static: false }) picker!: MatDatepicker<Date>;
  id: number = 0;
  selectedYear: number = 0; 
  editMode: boolean = false;
  profiles: Array<any> = [];
  send_profiles: Array<number> = [];
  select_all: boolean = false;
  showError: boolean = false;
  session_details!: { year: string, session:string, profiles: Array<any>}
  constructor(private route: ActivatedRoute, private router: Router, private medicalTestProfileService: MedicalTestProfileService, private sessionConfigService: SessionConfigService) {}
  ngOnInit(): void{
    this.send_profiles = [];
    this.session_details = { year: '', session: '', profiles: []};
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode = param['id'] != null;
        if(this.editMode){
          this.id = param['id'];
          this.sessionConfigService.get_session(param['id']).subscribe({
            next: data => {
              this.getEditMedicalTests(data.related_profiles);
              this.session_details = { year: data.year.toString(), session: data.session, profiles: data.related_profiles };
            }
          })
        }
        else{
          this.getMedicalTests();
        }
      }
    })
  }
  ngAfterViewInit(): void{}
  chosenYearHandler(ev:any){
    let { _d } = ev;
    this.selectedYear = _d;
    this.picker.close()
  }
  getEditMedicalTests(profiles: any){
    this.medicalTestProfileService.get_medical_test_profiles().subscribe({
      next: data => {
        this.profiles = data.results;
        for(var i=0;i<this.profiles.length; i++){
          for(var j=0;j<profiles.length; j++){
            if(this.profiles[i].id === profiles[j].medical_test_profile){
              this.profiles[i].completed = true;
            }
          }
          if(!this.profiles[i].completed){
            this.profiles[i].completed = false;
          }
        }
        profiles.forEach((d:any) => {
          this.send_profiles.push(d.medical_test_profile);
        })
      }
    })
  }
  getMedicalTests(){
    this.medicalTestProfileService.get_medical_test_profiles().subscribe({
      next: data => {
        this.profiles = data.results;
        this.profiles.forEach(d => {
          d.completed = false;
        })
      }
    })
  }
  selectAll(completed: boolean){
    this.select_all = completed;
    this.send_profiles = [];
    if(completed){
      this.profiles.forEach(p => {
        p.completed = completed;
        this.send_profiles.push(p.id);
      });
    }
    else{
      this.profiles.forEach(p => {
        p.completed = completed;
      });
    }
  }
  updateSelectAll(event: any, id:number) {
    this.session_details.profiles = [];
    if(event.checked){
      this.send_profiles.push(id);
    }
    else{
      let index = this.send_profiles.findIndex(p => p === id);
      this.send_profiles.splice(index,1);
    }
    this.select_all = this.profiles.every(p => p.completed);
  }
  someComplete(): boolean {
    if(!this.send_profiles[0]){
      return false;
    }
    return this.profiles.filter(p => p.completed).length > 0 && !this.select_all;
  }
  onSubmit(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      if(!this.send_profiles[0]){
        this.showError = true;
      }
      else{
        this.showError = false;
        let observable: Observable<any>;
        let fd = new FormData();
        let year = new Date(data.value.year);
        fd.append('year', year.getFullYear().toString());
        fd.append('session', data.value.session);
        fd.append('profiles', JSON.stringify(this.send_profiles));
        if(this.editMode){
          fd.append('id', this.id.toString());
          observable = this.sessionConfigService.update_session(fd)
        }
        else{
          observable = this.sessionConfigService.add_session(fd)
        }
        observable.pipe(take(1)).subscribe({
          next: data => {
            this.router.navigate(['/dashboard/configurations/session-config/view']);
          }
        })
      }
    }
  }
}