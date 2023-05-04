import { Injectable } from "@angular/core";
const TOKEN = 'token',
      USER_DETAILS = 'userDetails',
      EXPIRY = 'expiry';
@Injectable({ providedIn: 'root'})
export class LocalStorageService{
    public setDetails(token: string, expiry: Date){
        if(window.localStorage.getItem(TOKEN) && window.localStorage.getItem(EXPIRY)){
        // if(window.localStorage.getItem(TOKEN) && window.localStorage.getItem(USER_DETAILS) && window.localStorage.getItem(EXPIRY)){
            this.clearSession();
        }
        window.localStorage.setItem(TOKEN, token);
        // window.localStorage.setItem(USER_DETAILS, 'details');
        window.localStorage.setItem(EXPIRY, expiry.toString());
    }
    public getToken(){
        return window.localStorage.getItem(TOKEN);
    }
    public clearSession(){
        window.localStorage.clear();
    }
}