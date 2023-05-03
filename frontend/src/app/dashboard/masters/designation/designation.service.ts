import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private http: HttpClient) {}
  get_designations(){
      return this.http.get<any>(`${URL}/masters/designation`);
  }
  add_designation(data: FormData){
      return this.http.post(`${URL}/masters/designation`,data);
  }
  get_designation(id:number){
      return this.http.get<{id: number, name: string, hierarchy:number,emp_group:number}>(`${URL}/masters/designation/${id}`);
  }
  update_designation(data: FormData){
      return this.http.put(`${URL}/masters/designation/${data.get('id')}`,data);
  }
  delete_designation(id:number){
      return this.http.delete(`${URL}/masters/designation/${id}`);
  }

  get_emp_group(){
    return this.http.get<any>(`${URL}/masters/employee_group`);
  }
  
}
