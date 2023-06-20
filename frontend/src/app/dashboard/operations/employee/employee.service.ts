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
  update_draft(fd: FormData){
    return this.http.put<any>(`${URL}/operation/health_profile_test/${fd.get('id')}`, fd);
  }
  save_test_details(fd: FormData){
    return this.http.post(`${URL}/operation/health_test`, fd);
  }
  get_test_details(id: number){
    return this.http.get<any>(`${URL}/operation/health_test?test_id=${id}`);
  }
  upload_reports(fd: FormData){
    return this.http.post(`${URL}/operation/health_test/upload/report`,fd);
  }
  get_reports(id: number){
    return this.http.get<any>(`${URL}/operation/health_profile_test/${id}`);
  }
  get_reports_by_session(emp: number, session: number){
    return this.http.get<any>(`${URL}/operation/health_profile_test?employee=${emp} & session=${session}`);
  }
  add_remarks(fd: FormData){
    return this.http.patch(`${URL}/operation/health_profile_test/${fd.get('id')}`, fd);
  }
  delete_report(id:number){
    return this.http.delete(`${URL}/operation/health_test/upload/report/${id}`);
  }
}
