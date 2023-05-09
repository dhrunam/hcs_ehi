import { Component } from '@angular/core';
import { EmpgroupService } from '../empgroup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface ViewEmpgroup {
  id: number;
  name: string;
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor(private empgroupService: EmpgroupService,private _snackBar: MatSnackBar){}
  displayedColumns: string[] = ['sno','name', 'id'];
  dataSource: Array<ViewEmpgroup> = [];
  ngOnInit(): void{
    this.getEmpgroups();
  }
  openSnackBar() {
    this._snackBar.open('District Deleted', 'Dismiss');
  }
  onDeleteDistrict(id:number){
    if(confirm('Are you sure you want to delete district ?')){
      this.empgroupService.delete_empgroup(id).subscribe({
        next: data => {
          this.getEmpgroups();
          this.openSnackBar();
        }
      })
    }
  }
  getEmpgroups(){
    this.empgroupService.get_empgroups().subscribe({
      next: data => {
        this.dataSource = data.results;
      }
    })
  }
}
