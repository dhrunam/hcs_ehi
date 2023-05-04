import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
import { URL } from "src/environment/environment";
import { LocalStorageService } from "./local-storage.service";

interface AuthToken{
    token: string;
    expiry: Date;
}
@Injectable({ providedIn: 'root' })
export class AuthService{
    constructor(private http: HttpClient, private localStorageService: LocalStorageService){}
    login(data: FormData){
        return this.http.post<AuthToken>(`${URL}/login/`, data)
        .pipe(catchError((error:HttpErrorResponse) => {
            let err:string = '';
            if(error.error.non_field_errors){
                err = 'Invalid Credentials';
            }
            return throwError(() => err);
        }),
        tap(respData => {
            this.localStorageService.setDetails(respData.token, respData.expiry);
        }));
    }
    logout(){
        return this.http.post(`${URL}/logout/`,{})
        .pipe(tap(respData => {
            this.localStorageService.clearSession();
        }))
    }
}