import { Component } from '@angular/core';
import { SectionService } from '../section.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface ViewSection {
  id: number;
  name: string;
  organisation : number;
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor(private sectionService: SectionService,private _snackBar: MatSnackBar){}
  displayedColumns: string[] = ['sno','name', 'organisation', 'id'];
  dataSource: Array<ViewSection> = [];
  ngOnInit(): void{
    this.getSections();
  }
  openSnackBar() {
    this._snackBar.open('District Deleted', 'Dismiss');
  }
  onDeleteDistrict(id:number){
    if(confirm('Are you sure you want to delete district ?')){
      this.sectionService.delete_section(id).subscribe({
        next: data => {
          this.getSections();
          this.openSnackBar();
        }
      })
    }
  }
  getSections(){
    this.sectionService.get_sections().subscribe({
      next: data => {
        this.dataSource = data.results;
      }
    })
  }
}

