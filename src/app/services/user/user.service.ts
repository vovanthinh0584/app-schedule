import { Injectable } from '@angular/core';
import { UserServiceModule } from './user-service.module';
import { Observable } from 'rxjs';
import api from '../../core/api';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import {HttpService} from '../../core/HttpService'
import { CommonServiceModule } from 'src/app/core/common-service.module';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: CommonServiceModule
})
export class UserService {
    api:any;
    constructor(private router: Router,private httpClient:HttpClient) { 
        this.api=api.api;
        HttpService.Client.http=httpClient;
    }
    login(userRequestDTO:User): Observable<any> {
        const keyIv = CryptoJS.enc.Utf8.parse((userRequestDTO.UserID + '0000000000000000').substring(0, 16));
        const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(userRequestDTO.Password), keyIv,
            {
                keySize: 128 / 8,
                iv: keyIv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        var userTmp = new User();
        userTmp.UserID = userRequestDTO.UserID;
        userTmp.Password = encrypted.toString();
        userTmp.BusinessUnitID=userRequestDTO.BusinessUnitID;
        userTmp.Language=userRequestDTO.Language;
      
        return HttpService.Client.post(`${api.api.url}${api.Account.Login}`, userTmp);
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
   
    getListBussiness():Observable<any>{
        return HttpService.Client.get(`${api.api.url}${api.Account.ListBussiness}`);
    }
    
    getAppCenterImfomation(modelDTO:any)
     {
        modelDTO.Version=  this.api.version;
        return HttpService.Client.post(`${api.api.url}${api.Account.AppCenterInformation}`, modelDTO);
    }
   getVersion(){
    return HttpService.Client.get(`${api.api.url}${api.Account.Version}`);
   }
}
