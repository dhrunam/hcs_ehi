import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";
@Injectable({providedIn: 'root'})
export class EmployeeService{
    constructor(private http: HttpClient) {}
    get_designations(){
        return this.http.get<any>(`${URL}/masters/designation`);
    }
    get_organisations(){
        return this.http.get<any>(`${URL}/masters/organisation`);
    }
    get_bloodgroups(){
        return this.http.get<any>(`${URL}/masters/bloodgroup`);
    }
    get_employees(){
        return this.http.get<any>(`${URL}/masters/employee`);
    }
    get_employee(id:number){
        return this.http.get<any>(`${URL}/masters/employee/${id}`);
    }
    add_employee(data: FormData){
        return this.http.post(`${URL}/masters/employee`, data);
    }
    update_employee(data: FormData){
        return this.http.put(`${URL}/masters/employee/${data.get('id')}`, data);
    }
    delete_employee(id:number){
        return this.http.delete(`${URL}/masters/employee/${id}`);
    }
}