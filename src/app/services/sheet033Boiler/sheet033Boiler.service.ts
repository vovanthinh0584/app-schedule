import { Injectable } from '@angular/core';
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
export class Sheet033BoilerService {
    api:any;
    constructor(private router: Router,private httpClient:HttpClient) { 
        this.api=api.api;
        HttpService.Client.http=httpClient;
    }
    GetWorks(body:any):Observable<any>{
        return HttpService.Client.post(`${api.api.url}${api.Sheet033Boiler.GetWorks}`,body);
    }
    GetShiftsAttime(body:any):Observable<any>{
        return HttpService.Client.post(`${api.api.url}${api.Sheet033Boiler.GetShiftsAttime}`,body);
    }
    GetCheckList(body:any):Observable<any>{
        return HttpService.Client.post(`${api.api.url}${api.Sheet033Boiler.GetCheckList}`,body);
    }
    UpdateCheckList(body:any):Observable<any>{
        return HttpService.Client.post(`${api.api.url}${api.Sheet033Boiler.UpdateCheckList}`,body);
    }
}
