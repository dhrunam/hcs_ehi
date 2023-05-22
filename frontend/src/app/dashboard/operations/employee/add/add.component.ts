import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, of, take } from 'rxjs';
import { EmployeeService } from 'src/app/dashboard/masters/employee/employee.service';
import { HealthRecordService } from '../employee.service';
interface Employee{
  id:number;
  name:string;
}
export interface EmployeeDetails{
  name: string;
  year: string;
  collection_date: string;
  registration_date: string;
  location: string;
  analyst: string;
  ref_doctor: string;
  medical_test_session: string;
  sample_type:string;
  test_details?: Array<any>;
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  showAck: boolean = false;
  draftMode: boolean = false;
  date!: Date;
  tests: Array<any> = [];
  test_details: Array<any> = [];
  sessions: Array<any> = [];
  employee_details!: EmployeeDetails;
  employee: Employee = { id: 0, name: ''};
  employees: Array<any> = [];
  health_record_id: number = 0;
  file!: { file: any, filename: string };
  filteredEmployees!: Observable<any[]>;
  reports: Array<any> = [];
  reportsColumns = ['sno','report_name','report_file','operation']
  displayedColumns = ['sno','test_name','result','range'];
  constructor(private employeeService: EmployeeService, private healthRecordService: HealthRecordService){}
  ngOnInit(): void{
    this.getEmployees();
    this.date = new Date();
    this.getSessions(this.date.getFullYear().toString());
  }
  getEmployees(){
    this.employeeService.get_employees().subscribe({
      next: data => {
        this.employees = data.results;
      }
    })
  }
  getSessions(year: string){
    this.healthRecordService.get_sessions(year).subscribe({
      next: data => { 
        this.sessions = data.results;
      },
    })
  }
  getTests(id: any){
    this.tests = [];
    this.tests = this.sessions.find(session => session.id === id.value).related_profiles;
  }
  onSearchEmployee(key:string){
    key.length >=2 ? this.filteredEmployees = of(this._filter(key)) : this.filteredEmployees = of([]);
  }
  onSelectEmployee(employee: Employee){
    this.employee = employee;
  }
  onSaveDraft(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let collection_date = new Date(data.value.collection_date);
      let registration_date = new Date(data.value.registration_date);
      let observable: Observable<any>;
      let fd = new FormData();
      fd.append('employee', this.employee.id.toString());
      fd.append('collection_date', `${collection_date.getFullYear()}-${collection_date.getMonth() + 1 < 10 ? '0':''}${collection_date.getMonth()+1}-${collection_date.getDate() < 10 ? '0':''}${collection_date.getDate()}`);
      fd.append('reg_date', `${registration_date.getFullYear()}-${registration_date.getMonth() + 1 < 10 ? '0':''}${registration_date.getMonth()+1}-${registration_date.getDate() < 10 ? '0':''}${registration_date.getDate()}`);
      fd.append('location',data.value.location);
      fd.append('analyst', data.value.analyst);
      fd.append('ref_doctor', data.value.ref_doctor);
      fd.append('medical_test_session', data.value.session);
      fd.append('sample_type', data.value.sample_type);
      if(this.draftMode){
        fd.append('id', this.health_record_id.toString());
        observable = this.healthRecordService.update_draft(fd);
      }
      else{
        observable = this.healthRecordService.save_draft(fd);
      }
      observable.pipe(take(1)).subscribe({
        next: response => {
          this.draftMode = true;
          this.health_record_id = response.id;
          this.employee_details = {
            name: this.employees.find(e => e.id === this.employee.id).name,
            year: this.date.getFullYear().toString(),
            collection_date: `${collection_date.getDate() < 10 ? '0':''}${collection_date.getDate()}-${collection_date.getMonth() + 1 < 10 ? '0':''}${collection_date.getMonth()+1}-${collection_date.getFullYear()}`,
            registration_date: `${registration_date.getDate() < 10 ? '0':''}${registration_date.getDate()}-${registration_date.getMonth() + 1 < 10 ? '0':''}${registration_date.getMonth()+1}-${registration_date.getFullYear()}`,
            location: data.value.location,
            ref_doctor: data.value.ref_doctor,
            analyst: data.value.analyst,
            sample_type: data.value.sample_type,
            medical_test_session: this.sessions.find(s => s.id === data.value.session).session,
            
          }
        }
      })
    }
  }
  addTestDetails(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.tests.forEach(d => {
        d.related_test_profile.related_tests.forEach((e:any) => {
          const found = this.test_details.some(t => t.profile_id === e.profile);
          if(found){
            let index = this.test_details.findIndex(t => t.profile_id === e.profile);
            this.test_details[index].test_details.push({ id: e.id, name: e.name, value: data.value[`${e.id}`], normal_min_value: e.normal_min_value,normal_max_value: e.normal_max_value,unit: e.unit,});
          }
          else{
            this.test_details.push({
              profile_name: this.tests.find(t => t.medical_test_profile === e.profile).related_test_profile.name,
              profile_id: e.profile,
              test_details: [
                {
                  id: e.id,
                  name:e.name,
                  value: data.value[`${e.id}`],
                  normal_min_value: e.normal_min_value,
                  normal_max_value: e.normal_max_value,
                  unit: e.unit,
                }
              ]
            })
          }
        })
      })
      this.employee_details.test_details = this.test_details;
    }
  }
  onSubmitTestDetails(){
    let fd = new FormData();
    fd.append('data', JSON.stringify(this.test_details));
    fd.append('health_record_id', this.health_record_id.toString());
    this.healthRecordService.save_test_details(fd).subscribe({
      next: data => {
        this.showAck = true;
      }
    })
  }
  upload(event: any){
    if(event.target.files){
      this.file = { file: event.target.files[0], filename: event.target.files[0].name}
    }
  }
  addRemarks(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('id', this.health_record_id.toString());
      fd.append('emp_remarks', data.value.doctor_remarks);
      this.healthRecordService.add_remarks(fd).subscribe({
        next: data => {
          console.log(data);
        }
      })
    }
  }
  uploadDocument(report_name: string){
    let fd = new FormData();
    fd.append('emp_health_profile_test', this.health_record_id.toString());
    fd.append('report_name', report_name);
    fd.append('report_url', this.file.file);
    this.healthRecordService.upload_reports(fd).subscribe({
      next: data => {
        this.getDocuments(this.health_record_id);
      }
    })
  }
  getDocuments(id:number){
    this.healthRecordService.get_reports(id).subscribe({
      next: data => {
        this.reports = data.related_emp_health_tests_reports
      }
    })
  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.employees.filter(employee => employee.name.toLowerCase().includes(filterValue));
  }
}
