import { Component, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/dashboard/masters/employee/employee.service';
import { HealthRecordService } from '../employee.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { Observable, of, take } from 'rxjs';

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
  patient_remarks?: string;
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  @ViewChild('year_picker', { static: false }) picker!: MatDatepicker<Date>;
  selectedYear: string = '';
  session_id:number = 0;
  sessions: Array<any> = [];
  tests: Array<any> = [];
  test_details: Array<any> = [];
  filteredEmployees!: Observable<any[]>;
  employee: Employee = { id: 0, name: ''};
  employees: Array<any> = [];
  date!: Date;
  employee_details!: EmployeeDetails;
  reports: Array<any> = [];
  employee_test_details: Array<any>=[];
  constructor(private employeeService: EmployeeService, private healthRecordService: HealthRecordService){}

  ngOnInit(): void{
    this.getEmployees();
    this.date = new Date();
  }
  getEmployees(){
    this.employeeService.get_employees().subscribe({
      next: data => {
        this.employees = data.results;
      }
    })
  }
  chosenYearHandler(ev:any){
    let { _d } = ev;
    this.selectedYear = _d;
    let year = new Date(_d);
    this.getSessions(year.getFullYear().toString());
    this.picker.close()
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
    this.session_id=id.value;
  }

  onSearchEmployee(key:string){
    key.length >=2 ? this.filteredEmployees = of(this._filter(key)) : this.filteredEmployees = of([]);
  }
  onSelectEmployee(employee: Employee){
    this.employee = employee;
    this.getDocuments(this.employee.id);
   

  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.employees.filter(employee => employee.name.toLowerCase().includes(filterValue));
  }

  getDocuments(id:number){
    this.healthRecordService.get_reports_by_session(id,this.session_id).subscribe({
      next: data => {
        data= data.results[0]
        console.log('Data:')
        console.log(data);
        this.employee_test_details=data.related_emp_health_test_details;
        let collection_date = new Date(data.collection_date);
        let registration_date = new Date(data.reg_date);
        this.reports = data.related_emp_health_tests_reports
        this.employee_details = {
          name: this.employees.find(e => e.id === this.employee.id).name,
          year: data.related_medical_test_session.year,
          collection_date: `${collection_date.getDate() < 10 ? '0':''}${collection_date.getDate()}-${collection_date.getMonth() + 1 < 10 ? '0':''}${collection_date.getMonth()+1}-${collection_date.getFullYear()}`,
          registration_date: `${registration_date.getDate() < 10 ? '0':''}${registration_date.getDate()}-${registration_date.getMonth() + 1 < 10 ? '0':''}${registration_date.getMonth()+1}-${registration_date.getFullYear()}`,
          location: data.location,
          ref_doctor: data.ref_doctor,
          analyst: data.analyst,
          sample_type: data.sample_type,
          medical_test_session: data.related_medical_test_session.session,
          test_details:data.related_emp_health_test_details
        }

        console.log('Employee First Details:')
        console.log(this.employee_details)
        this.setTestDetails(data.id);
      }
    })
  }

  setTestDetails(test_profile_id:number){
   
      this.tests.forEach(d => {
        console.log('ForEachData:');
        console.log(d);
        d.related_test_profile.related_tests.forEach((e:any) => {
          const found = this.test_details.some(t => t.profile_id === e.profile);
          let test_details_index = this.employee_test_details.findIndex(i=>i.id===e.id);
          if(found){
            let index = this.test_details.findIndex(t => t.profile_id === e.profile);
           
            this.test_details[index].test_details.push({ 
              id: e.id, name: e.name, 
              value:  parseFloat( this.employee_test_details[test_details_index].medical_test_result),
              normal_min_value: parseFloat(e.normal_min_value),
              normal_max_value: parseFloat(e.normal_max_value),
              unit: e.unit,
            });
          }
          else{
            this.test_details.push({
              profile_name: this.tests.find(t => t.medical_test_profile === e.profile).related_test_profile.name,
              profile_id: e.profile,
              test_details: [
                {
                  id: e.id,
                  name:e.name,
                  value:  parseFloat( this.employee_test_details[test_details_index].medical_test_result),
                  normal_min_value: parseFloat(e.normal_min_value),
                  normal_max_value: parseFloat(e.normal_max_value),
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
