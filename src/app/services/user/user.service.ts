import { Injectable } from '@angular/core';
import { UserServiceModule } from './user-service.module';
import { Observable } from 'rxjs';
import api from '../../core/api';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import {HttpService} from '../../core/HttpService'
@Injectable({
    providedIn: UserServiceModule
})
export class UserService {
    api:any;
    constructor(private router: Router,public httpService:HttpService) { 
        this.api=api.api;
    }
    login(userRequestDTO: any): Observable<any> {
        const keyIv = CryptoJS.enc.Utf8.parse((userRequestDTO.User_Name + '0000000000000000').substring(0, 16));
        const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(userRequestDTO.User_Password), keyIv,
            {
                keySize: 128 / 8,
                iv: keyIv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        var userTmp:any = {};
        userTmp.User_Name = userRequestDTO.User_Name;
        userTmp.User_Password = encrypted.toString();
        debugger;
        return this.httpService.post(`${api.api.url}${api.Account.Login}`, userTmp);
    }

    logout(status?: number): Observable<boolean> {
        return;
        // if (status == 401) {
        //    const myObserver = {
        //        next: x => console.log('Observer got a next value: ' + x),
        //        error: err => console.error('Observer got an error: ' + err),
        //        complete: () => console.log('Observer got a complete notification'),
        //    };
        //    return myObserver;
        // } else {
        //    return this.http.post<boolean>(`${api.url}${api.Account.Logout}`, {});
        // }
        // return this.http.post<boolean>(`${api.url}${api.Account.Logout}`, {});
    }

    
    getAppCenterImfomation(modelDTO:any)
     {
        debugger;
        modelDTO.Version=  this.api.version;
        return this.httpService.post(`${api.api.url}${api.Account.AppCenterInformation}`, modelDTO);
    }
   
}
