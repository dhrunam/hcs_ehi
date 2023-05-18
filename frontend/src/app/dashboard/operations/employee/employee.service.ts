import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class HealthRecordService{
  constructor(private http:HttpClient) { }
  get_sessions(year: string){
    return this.http.get<any>(`${URL}/config/medical_test_session`, { params: { year: year } });
  }
  save_draft(fd: FormData){
    return this.http.post<any>(`${URL}/operation/health_profile_test`, fd);
  }
}
