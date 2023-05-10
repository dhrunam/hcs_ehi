import { Component } from '@angular/core';
import { OrganisationService } from '../organisations.service';
import { ViewDistrict } from '../../district/view/view.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { promptAnimation } from 'src/app/shared/animations/prompt.animation';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  animations: [
    promptAnimation
  ]
})
export class ViewComponent {
  organisations: Array<any> = [];
  showPrompt: boolean = false;
  message: string = '';
  organisation!: ViewDistrict;
  displayedColumns = ['sno','organisation','district','operations']
  constructor(private organisationService: OrganisationService,private _snackBar: MatSnackBar){}
  ngOnInit(): void{
    this.getOrganisations();
  }
  getOrganisations(){
    this.organisationService.get_organisations().subscribe({
      next: data => {
        this.organisations = data;
      }
    })
  }
  openPrompt(id:number, name:string){
    this.organisation = { id: id, name: name};
    this.showPrompt = true;
    this.message = 'organisation '+name;
  }
  closePrompt(data: {status: boolean}){
    if(data.status){
      this.deleteOrganisation();
    }
    this.showPrompt = false;
  }
  deleteOrganisation(){
    this.organisationService.delete_organisation(this.organisation.id).subscribe({
      next: data => {
        this.getOrganisations();
        this.openSnackBar();
      }
    })
  }
  openSnackBar() {
    this._snackBar.open('Organisation Deleted', 'Dismiss', {
      duration: 2000
    });
  }
}