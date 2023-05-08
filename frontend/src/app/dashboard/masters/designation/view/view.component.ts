import { Component } from '@angular/core';
import { DesignationService } from '../designation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { promptAnimation } from 'src/app/shared/animations/prompt.animation';

export interface RelatedEmpGroup{
  id: number;
  name: string;
}
export interface ViewDesignation{
 id: number;
 emp_group: number;
 name: string;
 hierarchy: number;
 related_emp_group : RelatedEmpGroup;
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  animations: [
    promptAnimation
  ]
})
export class ViewComponent {
  showPrompt: boolean = false;
  designation!: RelatedEmpGroup;
  message: string = '';
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
        this.dataSource=data.results;
      }
    })
  }
  openPrompt(id:number, name: string){
    this.designation = { id: id, name: name};
    this.showPrompt = true;
    this.message = 'designation '+name;
  }
  closePrompt(data:{status: boolean}){
    if(data.status){
      this.deleteDesignation();
    }
    this.showPrompt = false;
  }
  deleteDesignation(){
    this.designationService.delete_designation(this.designation.id).subscribe({
      next: data => {
        this.getDesignation();
        this.openSnackBar();
      }
    })
  }
  openSnackBar()
  {
    this._snackBar.open('Designation Deleted', 'Dismiss', {
      duration: 2000
    });
  }
}
