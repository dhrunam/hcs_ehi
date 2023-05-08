import { Component } from '@angular/core';
import { OrganisationService } from '../organisations.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { DistrictService } from '../../district/district.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  id:number = 0;
  editMode: boolean = false;
  districts: Array<{id:number, name: string }> = [];
  organisation!: { name: string, hierarchy:string, district: string, address: string };
  constructor(private organisationService: OrganisationService, private route: ActivatedRoute, private router: Router, private districtService: DistrictService){}
  ngOnInit(): void{
    this.organisation = { name: '', hierarchy: '', district: '', address: ''};
    this.districtService.get_districts().subscribe({
      next: data => {
        this.districts = data.results;
      }
    })
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode = param['id'] != null;
        if(this.editMode){
          this.id = param['id'];
          this.organisationService.get_organisation(param['id']).subscribe({
            next: data => {
              this.organisation = { name: data.name, hierarchy: data.hierarchy, district: data.district, address: data.address };
            }
          })
        }
      }
    })
  }
  onSubmit(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let observable: Observable<any>;
      let fd = new FormData();
      fd.append('name', data.value.organisation_name);
      fd.append('district', data.value.district);
      fd.append('address', data.value.address);
      fd.append('hierarchy', data.value.hierarchy);
      if(this.editMode){
        fd.append('id',this.id.toString());
        observable = this.organisationService.update_organisation(fd);
      }
      else{
        observable = this.organisationService.add_organisation(fd);
      }
      observable.pipe(take(1)).subscribe({
        next: data => {
          this.router.navigate(['/dashboard/masters/organisation/view']);
        }
      })
    }
  }
}
