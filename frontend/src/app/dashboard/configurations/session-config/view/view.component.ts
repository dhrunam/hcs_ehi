import { Component } from '@angular/core';
import { SessionConfigService } from '../session-config.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  sessions: Array<any> = [];
  constructor(private sessionConfigService: SessionConfigService){}
  ngOnInit(): void{
    this.getSessions();
  }
  getSessions(){
    this.sessionConfigService.get_sessions().subscribe({
      next: data => {
        this.sessions = data.results;
      }
    })
  }
}
