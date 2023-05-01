import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  toggle: boolean = true;
  mobile: boolean = false;
  @HostListener('window:resize', ['$event'])
  onResize(event:any){
    let screenWidth = window.innerWidth;
    this.toggle = screenWidth < 1136 ? false : true;
    this.mobile = screenWidth < 1136 ? true : false;
  }
  ngOnInit(){
    let screenWidth = window.innerWidth;
    this.toggle = screenWidth < 1136 ? false : true;
    this.mobile = screenWidth < 1136 ? true : false;
  }
}
