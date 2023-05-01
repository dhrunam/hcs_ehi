import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL } from "src/environment/environment";

interface AuthToken{
    token: string;
    expiry: Date;
}
@Injectable({ providedIn: 'root' })
export class AuthService{
    constructor(private http: HttpClient){}
    login(data: FormData){
        return this.http.post<AuthToken>(`${URL}/login/`, data);
    }
}