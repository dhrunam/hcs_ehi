import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";
export interface District{
    count: number;
    previous: string;
    next: string;
    results: Array<{id: number, name: string}>
}
@Injectable({ providedIn: 'root'})
export class DistrictService{
    constructor(private http: HttpClient) {}
    get_districts(){
        return this.http.get<District>(`${URL}/masters/district`);
    }
    add_district(data: FormData){
        return this.http.post(`${URL}/masters/district`,data);
    }
    get_district(id:number){
        return this.http.get<{id: number, name: string}>(`${URL}/masters/district/${id}`);
    }
    update_district(data: FormData){
        return this.http.put(`${URL}/masters/district/${data.get('id')}`,data);
    }
    delete_district(id:number){
        return this.http.delete(`${URL}/masters/district/${id}`);
    }
}