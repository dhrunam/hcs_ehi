import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";
export interface EmployeeType{
    count: number;
    previous: string;
    next: string;
    results: Array<{id: number, type: string}>
  }
@Injectable({ providedIn: 'root' })
export class EmployeeTypeService{
    constructor(private http: HttpClient){}

    get_employee_types(){
        return this.http.get<EmployeeType>(`${URL}/masters/employee_type`);
    }
    get_employee_type(id:number){
        return this.http.get<{id:number, type: string}>(`${URL}/masters/employee_type/${id}`);
    }
    add_employee_type(data: FormData){
        return this.http.post(`${URL}/masters/employee_type`,data);
    }
    update_employee_type(data: FormData){
        return this.http.put(`${URL}/masters/employee_type/${data.get('id')}`,data);
    }
    deleted_employee_type(id:number){
        return this.http.delete(`${URL}/masters/employee_type/${id}`);
    }
}