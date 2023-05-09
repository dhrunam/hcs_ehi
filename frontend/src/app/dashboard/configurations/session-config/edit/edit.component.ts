import { Component, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  @ViewChild('picker', { static: false }) picker!: MatDatepicker<Date>;
  selectedYear: number = 0; 
  editMode: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void{
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode = param['id'] != null;
        if(this.editMode){
          
        }
      }
    })
  }
  chosenYearHandler(ev:any){
    let { _d } = ev;
    this.selectedYear = _d;
    this.picker.close()
  }
}
