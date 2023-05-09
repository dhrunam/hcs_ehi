import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";
export interface Section{
    count: number;
    previous: string;
    next: string;
    results: Array<{id: number, name: string, organisation : number}>
}
@Injectable({ providedIn: 'root'})
export class SectionService{
    constructor(private http: HttpClient) {}
    get_sections(){
        return this.http.get<Section>(`${URL}/masters/section`);
    }
    add_section(data: FormData){
        return this.http.post(`${URL}/masters/section`,data);
    }
    get_section(id:number){
        return this.http.get<{id: number, name: string, organisation : number}>(`${URL}/masters/section/${id}`);
    }
    update_section(data: FormData){
        return this.http.put(`${URL}/masters/section/${data.get('id')}`,data);
    }
    delete_section(id:number){
        return this.http.delete(`${URL}/masters/section/${id}`);
    }
<<<<<<< HEAD
    get_organisations()
    {
        return this.http.get<any>(`${URL}/masters/organisation/list`)
    }
=======
>>>>>>> d39fd0be9295d5eb66975e1cb759f5953bd64911
}