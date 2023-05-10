import { Component } from '@angular/core';
import { EmpgroupService } from '../empgroup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { promptAnimation } from 'src/app/shared/animations/prompt.animation';
export interface ViewEmpgroup {
  id: number;
  name: string;
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
  constructor(private empgroupService: EmpgroupService,private _snackBar: MatSnackBar){}
  displayedColumns: string[] = ['sno','name', 'id'];
  empgroup: { id: number, name: string} = { id: 0, name: '' };
  message: string = '';
  showPrompt: boolean = false; 
  dataSource: Array<ViewEmpgroup> = [];
  ngOnInit(): void{
    this.getEmpgroups();
  }
  deleteEmpGroup(id:number){
    this.empgroupService.delete_empgroup(id).subscribe({
      next: data => {
        this.getEmpgroups();
        this.openSnackBar();
      }
    })
  }
  getEmpgroups(){
    this.empgroupService.get_empgroups().subscribe({
      next: data => {
        this.dataSource = data.results;
      }
    })
  }
  openSnackBar() {
    this._snackBar.open('Employee Group Deleted', 'Dismiss', {
      duration: 2000
    });
  }
  openPrompt(id:number, name:string){
    this.empgroup = { id: id, name: name};
    this.showPrompt = true;
    this.message = 'group '+name;
  }
  closePrompt(data: {status: boolean}){
    if(data.status){
      this.deleteEmpGroup(this.empgroup.id);
    }
    this.showPrompt = false;
  }
}
