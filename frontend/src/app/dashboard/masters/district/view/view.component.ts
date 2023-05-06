import { Component } from '@angular/core';
import { DistrictService } from '../district.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { promptAnimation } from 'src/app/shared/animations/prompt.animation';

export interface ViewDistrict {
  id: number;
  name: string;
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  animations: [
    promptAnimation
  ],
})
export class ViewComponent {
  constructor(private districtService: DistrictService,private _snackBar: MatSnackBar){}
  message: string = '';
  district!: ViewDistrict;
  displayedColumns: string[] = ['sno','name', 'id'];
  dataSource: Array<ViewDistrict> = [];
  showPrompt: boolean = false;
  ngOnInit(): void{
    this.getDistricts();
  }
  openSnackBar() {
    this._snackBar.open('District Deleted', 'Dismiss', {
      duration: 2000
    });
  }
  openPrompt(id:number, name:string){
    this.district = { id: id, name: name};
    this.showPrompt = true;
    this.message = 'district '+name;
  }
  closePrompt(data: {status: boolean}){
    if(data.status){
      this.deleteDistrict();
    }
    this.showPrompt = false;
  }
  deleteDistrict(){
    this.districtService.delete_district(this.district.id).subscribe({
      next: data => {
        this.getDistricts();
        this.openSnackBar();
      }
    })
  }
  getDistricts(){
    this.districtService.get_districts().subscribe({
      next: data => {
        this.dataSource = data.results;
      }
    })
  }
}
