import { Component,Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-menus',
  templateUrl: './sidebar-menus.component.html',
  styleUrls: ['./sidebar-menus.component.css']
})
export class SidebarMenusComponent {
  toggleKey: string = '';
  toggle:boolean = false;
  constructor(private renderer: Renderer2, private router: Router){}
  ngOnInit(): void{
    this.toggleKey = this.router.url.split('/')[2];
    this.toggle = this.toggleKey === '' ? false : true;
  }
  onSubMenuToggle(elem1:any, elem2: any){
    this.toggle = !this.toggle;
    if(this.toggle){
      this.renderer.addClass(elem2, 'active');
      this.renderer.addClass(elem1, 'active');
    }
    else{
      this.renderer.removeClass(elem2, 'active');
      this.renderer.removeClass(elem1,'active');
    }
    
  }
}
