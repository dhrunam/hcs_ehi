import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from 'src/environment/environment';
export interface Organisation{
    count: number;
    previous: string;
    next: string;
    results: Array<any>
}
@Injectable({ providedIn: 'root' })
export class OrganisationService{
    constructor(private http: HttpClient){}
    get_organisations(){
        return this.http.get<any>(`${URL}/masters/organisation/list`);
    }
    get_organisation(id:number){
        return this.http.get<any>(`${URL}/masters/organisation/${id}`);
    }
    add_organisation(data: FormData){
        return this.http.post(`${URL}/masters/organisation`,data);
    }
    update_organisation(data: FormData){
        return this.http.put(`${URL}/masters/organisation/${data.get('id')}`,data);
    }
    delete_organisation(id:number){
        return this.http.delete(`${URL}/masters/organisation/${id}`);
    }
}