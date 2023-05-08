import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, FormsModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide: boolean = true;
  showLoader: boolean = false;
  error = null;
  constructor(private authService: AuthService,private router: Router){}
  onLogin(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.showLoader = true;
      this.error = null;
      let fd = new FormData();
      fd.append('username', data.value.username);
      fd.append('password', data.value.password);
      fd.append('client', 'web');
      this.authService.login(fd).subscribe({
        next: data => {
          this.showLoader = false;
          this.error = null;
          window.location.href = '/dashboard';
        },
        error: err => {
          this.showLoader = false;
          this.error = err;
        },
      })
    }
  }
}
