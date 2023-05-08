import { Component } from '@angular/core';
import { SectionService } from '../section.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { promptAnimation } from 'src/app/shared/animations/prompt.animation';
export interface ViewSection {
  id: number;
  name: string;
  organisation?: number;
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
  constructor(private sectionService: SectionService,private _snackBar: MatSnackBar){}
  section!: ViewSection;
  showPrompt: boolean = false;
  message: string = '';
  displayedColumns: string[] = ['sno','name', 'organisation', 'id'];
  dataSource: Array<ViewSection> = [];
  ngOnInit(): void{
    this.getSections();
  }
  openSnackBar() {
    this._snackBar.open('Section Deleted', 'Dismiss');
  }
  openPrompt(id:number, name:string){
    this.section = { id: id, name: name};
    this.showPrompt = true;
    this.message = 'section '+name;
  }
  closePrompt(data: {status: boolean}){
    if(data.status){
      this.deleteSection();
    }
    this.showPrompt = false;
  }
  deleteSection(){
    this.sectionService.delete_section(this.section.id).subscribe({
      next: data => {
        this.getSections();
        this.openSnackBar();
      }
    })
  }
  getSections(){
    this.sectionService.get_sections().subscribe({
      next: data => {
        this.dataSource = data.results;
      }
    })
  }
}

