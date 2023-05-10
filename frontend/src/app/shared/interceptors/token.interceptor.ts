import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { LocalStorageService } from "../services/local-storage.service";
import { Injectable } from "@angular/core";
@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(private localStorageService: LocalStorageService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.localStorageService.getToken();
        if(token != null){
            authReq = req.clone({headers: new HttpHeaders().set('Authorization', `Token ${token}`)});
        }
        return next.handle(authReq).pipe(catchError((err: HttpErrorResponse) => {
            if(err.error.detail == 'Invalid token.' || err.error.detail == 'The given token has expired.'){
                alert('Session Expired !! Please login again');
                window.location.href = '/';
                this.localStorageService.clearSession();
            }
            return throwError(() => err);
        }));
    }
}