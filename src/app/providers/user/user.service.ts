import { Injectable } from '@angular/core';
import { UserServiceModule } from './user-service.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequestDTO } from 'src/app/dto/request-dto/UseRequestDTO';
import api from '../api';
import { User } from 'src/app/model/User';
import { LoginResponseDTO } from 'src/app/dto/response-dto/LoginResponseDTO';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { UserEx,AppCenterParam } from 'src/app/model/news.model';

@Injectable({
    providedIn: UserServiceModule
})
export class UserService {
    api:any;
    constructor(public http: HttpClient, private router: Router) { 
        this.api=api.api;
    }

    login(userRequestDTO: UserRequestDTO): Observable<LoginResponseDTO> {
        const keyIv = CryptoJS.enc.Utf8.parse((userRequestDTO.User_Name + '0000000000000000').substring(0, 16));
        const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(userRequestDTO.User_Password), keyIv,
            {
                keySize: 128 / 8,
                iv: keyIv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        const userTmp = new UserRequestDTO();
        userTmp.User_Name = userRequestDTO.User_Name;
        userTmp.User_Password = encrypted.toString();
        userTmp.Hopital_Code = userRequestDTO.Hopital_Code;
        debugger;
     
        return this.http.post<LoginResponseDTO>(`${api.api.url}${api.Account.Login}`, userTmp);
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

    loginDemo(value: any) {
        const a = <UserEx>{
            Password: value.password,
            Username: value.username
        };
        return this.http.post<UserEx>(`${api.Account}`, a);
    }

    regDemo(value: any) {
        const a = <UserEx>{
            Password: value.password,
            Username: value.username,
            Name: value.name
        };
        return this.http.post<UserEx>(`${api.CMS.url}${api.CMS.Reg}`, a);
    }
    getAppCenterImfomation(modelDTO:AppCenterParam)
     {
        debugger;
        modelDTO.Version=  this.api.version;
        return this.http.post<AppCenterParam>(`${api.api.url}${api.Account.AppCenterInformation}`, modelDTO);
    }
    getAppSettingHYT(): Observable<any> {
        return this.http.post<any>(`${api.url}${api.DichVu.DsAppSettingBHYT}`, {  });
    }
}
