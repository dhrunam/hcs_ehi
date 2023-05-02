import { Component } from '@angular/core';
import { DistrictService } from '../district.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface ViewDistrict {
  id: number;
  name: string;
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor(private districtService: DistrictService,private _snackBar: MatSnackBar){}
  displayedColumns: string[] = ['sno','name', 'id'];
  dataSource: Array<ViewDistrict> = [];
  ngOnInit(): void{
    this.getDistricts();
  }
  openSnackBar() {
    this._snackBar.open('District Deleted', 'Dismiss');
  }
  onDeleteDistrict(id:number){
    if(confirm('Are you sure you want to delete district ?')){
      this.districtService.delete_district(id).subscribe({
        next: data => {
          this.getDistricts();
          this.openSnackBar();
        }
      })
    }
  }
  getDistricts(){
    this.districtService.get_districts().subscribe({
      next: data => {
        this.dataSource = data.results;
      }
    })
  }
}
