import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
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
        return next.handle(authReq);
    }
}