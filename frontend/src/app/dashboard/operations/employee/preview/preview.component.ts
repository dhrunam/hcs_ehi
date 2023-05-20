import { Component, Input } from '@angular/core';
import { EmployeeDetails } from '../add/add.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
  displayedColumns = ['sno','test_name','results','range']
  @Input() details?: EmployeeDetails;
}
