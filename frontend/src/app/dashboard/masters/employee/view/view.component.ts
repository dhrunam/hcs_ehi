import { Component } from '@angular/core';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  employees: Employee[] = [
    {
      id: 1,
      employee_name: 'Test User',
      employee_address: 'Test Address',
      employee_organization: 'Test Organization',
      employe_date_of_superannuation: 'Test Date',
      employee_blood_group: 'Test',
      employee_date_of_birth: 'Test Date',
      employee_date_of_entry_in_service: 'Test Date',
      employee_designation: 'Test Designation',
      employee_group: 'Test Group',
      employee_id: 'Test ID',
    }
  ];
  displayedColumns = ['sno','emp_name','emp_id','emp_org','operations'];

  onDeleteEmployee(){
    confirm('Are you sure you want to delete employee ?');
  }
}
