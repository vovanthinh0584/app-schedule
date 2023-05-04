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
export class WorkPermitService {
    api:any;
    constructor(private router: Router,private httpClient:HttpClient) { 
        this.api=api.api;
        HttpService.Client.http=httpClient;
    }
    GetWorkPermitImages(body:any):Observable<any>{
        return HttpService.Client.post(`${api.api.url}${api.WorkPermit.GetWorkPermitImages}`,body);
    }
    DeleteWorkPermitImage(body:any):Observable<any>{
        return HttpService.Client.post(`${api.api.url}${api.WorkPermit.DeleteWorkPermitImage}`,body);
    }
    EditWorkPermitImage(body:any):Observable<any>{
        return HttpService.Client.post(`${api.api.url}${api.WorkPermit.EditWorkPermitImage}`,body);
    }

    queryListWorkPermit():Observable<any>{
        return HttpService.Client.get(`${api.api.url}${api.WorkPermit.GetWorkPermits}`);
    }
    queryListProjectManager():Observable<any>{
        return HttpService.Client.get(`${api.api.url}${api.WorkPermit.GetProjectManagers}`);
    }
    queryListZoneManager():Observable<any>{
        return HttpService.Client.get(`${api.api.url}${api.WorkPermit.GetZoneManagers}`);
    }
    queryListSaleManager():Observable<any>{
        return HttpService.Client.get(`${api.api.url}${api.WorkPermit.GetSaleManagers}`);
    }
    queryVerdorManager():Observable<any>{
        return HttpService.Client.get(`${api.api.url}${api.WorkPermit.QueryVendorManagers}`);
    }
    saveWorkPermit(data:any):Observable<any>{
        return HttpService.Client.post(`${api.api.url}${api.WorkPermit.SaveWorkPermit}`,data);
    }
    saveImageWorkPermit(data:any):Observable<any>{
        return HttpService.Client.post(`${api.api.url}${api.WorkPermit.SaveImageWorkPermit}`,data);
    }
    createApprovalWorkPermit(data:any):Observable<any>{
        return HttpService.Client.post(`${api.api.url}${api.WorkPermit.Approval}`,data);
    }
    createNoApprovalWorkPermit(data:any):Observable<any>{
        return HttpService.Client.post(`${api.api.url}${api.WorkPermit.NoApproval}`,data);
    }
    sendWorkPermit(data:any):Observable<any>{
        return HttpService.Client.post(`${api.api.url}${api.WorkPermit.SendWorkPermit}`,data);
    }
    
    CloseWorkerPermit(data:any):Observable<any>{
        return HttpService.Client.post(`${api.api.url}${api.WorkPermit.CloseWorkerPermit}`,data);
    }
    
}
