import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";
export interface Empgroup{
    count: number;
    previous: string;
    next: string;
    results: Array<{name: string}>
}

@Injectable({
  providedIn: 'root'
})
export class EmpgroupService {

  constructor(private http: HttpClient) {}
    get_empgroups(){
        return this.http.get<any>(`${URL}/masters/employee_group`);
    }
    add_empgroup(data: FormData){
        return this.http.post(`${URL}/masters/employee_group`,data);
    }
    get_empgroup(id:number){
        return this.http.get<{id:number, name:string}>(`${URL}/masters/employee_group/${id}`);
    }
    update_empgroup(data: FormData){
        return this.http.put(`${URL}/masters/employee_group/${data.get('id')}`,data);
    }
    delete_empgroup(id:number){
        return this.http.delete(`${URL}/masters/employee_group/${id}`);
    }
}
