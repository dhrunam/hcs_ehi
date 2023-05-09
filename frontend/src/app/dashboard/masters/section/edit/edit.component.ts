import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SectionService } from '../section.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  section_name: string = '';
  organisation: number = 0;
  organisationlist: Array< { id:number, name : string}> = []
  id:number = 0;
  editMode: boolean = false;
  constructor(private sectionService: SectionService, private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void{
    this.get_organisation();
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode = param['id'] != null;
        if(this.editMode){
          this.id = param['id'];
          this.sectionService.get_section(param['id']).subscribe({
            next: data => {
              this.section_name = data.name;
              this.organisation = data.organisation
            }
          })
        }
      }
    })
  }
  onSubmit(data: NgForm){
    console.log(data);
    let observable: Observable<any>;
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('name', data.value.name);
      fd.append('organisation', data.value.organisation);
      
      if(this.editMode){
        fd.append('id', this.id.toString());
        observable = this.sectionService.update_section(fd);
      }
      else{
        
        observable = this.sectionService.add_section(fd);
      }
      observable.subscribe({
        next: data => {
          this.router.navigate(['/dashboard/masters/section']);
        }
      })
    }
  }

  get_organisation(){
    this.sectionService.get_organisations().subscribe({
      next: data => {
       this.organisationlist = data;
      }
    })
  }
}

