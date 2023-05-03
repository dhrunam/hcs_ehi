import { Component } from '@angular/core';
import { DesignationService } from '../designation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface RelatedEmpGroup{
  id: number;
  name: string;
}
export interface ViewDesignation{
 id: number;
 emp_group: number;
 name: string;
 hierarchy: number;
 related_emp_group : RelatedEmpGroup

}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  
  displayedColumns: string[] = ['sno','name','emp_group','hierarchy', 'id'];
  dataSource: Array<ViewDesignation> = [];
  constructor(private designationService: DesignationService,private _snackBar: MatSnackBar){}

  ngOnInit(): void{
    this.getDesignation();
  }

  getDesignation()
  {
    this.designationService.get_designations().subscribe({
      next: data => {
        console.log(data.results);
        this.dataSource=data.results;
        console.log(this.dataSource);
      }
    })
  }

  onDeleteDesignation(id: number)
  {
    if(confirm('Are you sure you want to delete district ?')){
      this.designationService.delete_designation(id).subscribe({
        next: data => {
          this.getDesignation();
          this.openSnackBar();
        }
      })
    }
  }

  openSnackBar()
  {
    this._snackBar.open('Designation Deleted', 'Dismiss');
  }
}
