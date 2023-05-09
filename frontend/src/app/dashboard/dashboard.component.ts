import { Component,HostListener } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  toggle: boolean = true;
  mobile: boolean = false;
  constructor(private authService: AuthService, private router: Router){}
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
  onLogout(){
    this.authService.logout().subscribe({
      next: data => {
        this.router.navigate(['/']);
      }
    })
  }
}
