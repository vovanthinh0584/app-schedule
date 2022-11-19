import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import api from '../../core/api';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { HttpService } from '../../core/HttpService'
import { CommonServiceModule } from 'src/app/core/common-service.module';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: CommonServiceModule
})
export class GetTaskService {
    api: any;
    constructor(private router: Router, private httpClient: HttpClient) {
        this.api = api.api;
        HttpService.Client.http = httpClient;
    }

    QueryGetTask(): Observable<any> {
        return HttpService.Client.get(`${api.api.url}${api.GetTask.Entity}`);
    }
    CreateGetTask(body: any): Observable<any> {
        return HttpService.Client.post(`${api.api.url}${api.GetTask.Entity}`, body);
    }
}
