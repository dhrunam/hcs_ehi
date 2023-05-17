import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";
export interface Session{
    count: number;
    previous: string;
    next: string;
    results: Array<any>
}
@Injectable({ providedIn: 'root' })
export class SessionConfigService{
    constructor(private http: HttpClient){}
    get_sessions(){
        return this.http.get<Session>(`${URL}/config/medical_test_session`);
    }
    get_session(id:number){
        return this.http.get<any>(`${URL}/config/medical_test_session/${id}`);
    }
    add_session(data: FormData){
        return this.http.post(`${URL}/config/medical_test_session`, data);
    }
    update_session(data: FormData){
        return this.http.patch(`${URL}/config/medical_test_session/${data.get('id')}`,data);
    }
}