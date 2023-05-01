import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
