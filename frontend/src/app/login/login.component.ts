import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService,private router: Router){}
  onLogin(data: NgForm){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('username', data.value.username);
      fd.append('password', data.value.password);
      fd.append('client', 'web');
      this.authService.login(fd).subscribe({
        next: data => {
          window.location.href = '/dashboard';
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }
}
